import crypto from 'crypto';
import { prisma } from '../../config/database';
import { hashPassword, comparePassword } from '../../utils/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { AppError } from '../../middleware/error.middleware';
import { SystemRole } from '@prisma/client';
import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from './auth.schemas';
import { z } from 'zod';

export class AuthService {
  /**
   * Register a new user account
   */
  async register(data: z.infer<typeof registerSchema>) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('Email address already registered', 409);
    }

    if (data.mobile) {
      const existingMobile = await prisma.user.findUnique({
        where: { mobile: data.mobile },
      });
      if (existingMobile) {
        throw new AppError('Mobile number already registered', 409);
      }
    }

    const hashedPassword = await hashPassword(data.password);

    // Fetch or create requested role
    const roleRecord = await prisma.role.findUnique({
      where: { name: data.role },
    });

    if (!roleRecord) {
      throw new AppError(`Role '${data.role}' does not exist in system`, 400);
    }

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        mobile: data.mobile,
        passwordHash: hashedPassword,
        fullName: data.fullName,
        designation: data.designation,
        district: data.district,
        state: data.state || 'Delhi',
        roles: {
          create: {
            roleId: roleRecord.id,
          },
        },
      },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    const userRoles = newUser.roles.map((r) => r.role.name as SystemRole);

    const accessToken = signAccessToken({
      userId: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      roles: userRoles,
      district: newUser.district,
    });

    const refreshToken = signRefreshToken(newUser.id);
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    // Store refresh token in database
    await prisma.refreshToken.create({
      data: {
        userId: newUser.id,
        tokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: newUser.id,
        action: 'USER_REGISTERED',
        entityType: 'User',
        entityId: newUser.id,
        metadata: { email: newUser.email, roles: userRoles },
      },
    });

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        roles: userRoles,
        district: newUser.district,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * User login with email and password
   */
  async login(data: z.infer<typeof loginSchema>, ipAddress?: string, userAgent?: string) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      await prisma.auditLog.create({
        data: {
          action: 'LOGIN_FAILED',
          entityType: 'User',
          metadata: { email: data.email, reason: 'User not found' },
          ipAddress,
          userAgent,
        },
      });
      throw new AppError('Invalid email or password', 401);
    }

    if (!user.isActive) {
      throw new AppError('Account deactivated. Please contact support.', 403);
    }

    const isPasswordValid = await comparePassword(data.password, user.passwordHash);

    if (!isPasswordValid) {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: 'LOGIN_FAILED',
          entityType: 'User',
          entityId: user.id,
          metadata: { reason: 'Incorrect password' },
          ipAddress,
          userAgent,
        },
      });
      throw new AppError('Invalid email or password', 401);
    }

    const userRoles = user.roles.map((r) => r.role.name as SystemRole);

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: userRoles,
      district: user.district,
    });

    const refreshToken = signRefreshToken(user.id);
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: 'USER_LOGIN_SUCCESS',
        entityType: 'User',
        entityId: user.id,
        ipAddress,
        userAgent,
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        roles: userRoles,
        district: user.district,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh token rotation
   */
  async refresh(refreshTokenRaw: string) {
    let payload;
    try {
      payload = verifyRefreshToken(refreshTokenRaw);
    } catch (err) {
      throw new AppError('Invalid or expired refresh token', 401);
    }

    const tokenHash = crypto.createHash('sha256').update(refreshTokenRaw).digest('hex');

    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
    });

    if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
      throw new AppError('Refresh token revoked or expired', 401);
    }

    // Revoke current token (rotation)
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new AppError('User inactive or not found', 401);
    }

    const userRoles = user.roles.map((r) => r.role.name as SystemRole);

    const newAccessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: userRoles,
      district: user.district,
    });

    const newRefreshToken = signRefreshToken(user.id);
    const newTokenHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex');

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: newTokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Revoke refresh token / logout
   */
  async logout(refreshTokenRaw?: string, userId?: string) {
    if (refreshTokenRaw) {
      const tokenHash = crypto.createHash('sha256').update(refreshTokenRaw).digest('hex');
      await prisma.refreshToken.updateMany({
        where: { tokenHash },
        data: { revoked: true },
      });
    }

    if (userId) {
      await prisma.auditLog.create({
        data: {
          actorId: userId,
          action: 'USER_LOGOUT',
          entityType: 'User',
          entityId: userId,
        },
      });
    }

    return { message: 'Logged out successfully' };
  }

  /**
   * Get current authenticated user details
   */
  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        mobile: true,
        fullName: true,
        designation: true,
        district: true,
        state: true,
        isEmailVerified: true,
        isMobileVerified: true,
        isActive: true,
        createdAt: true,
        roles: {
          select: {
            role: {
              select: { name: true, description: true },
            },
          },
        },
        organizationMemberships: {
          select: {
            organization: {
              select: { id: true, name: true, code: true, type: true },
            },
            roleInOrg: true,
          },
        },
      },
    });

    if (!user) {
      throw new AppError('User profile not found', 404);
    }

    return {
      ...user,
      roles: user.roles.map((r) => r.role.name),
    };
  }

  /**
   * Change user password
   */
  async changePassword(userId: string, data: z.infer<typeof changePasswordSchema>) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isValid = await comparePassword(data.currentPassword, user.passwordHash);
    if (!isValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    const newHash = await hashPassword(data.newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newHash },
    });

    // Revoke all existing refresh tokens for security
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true },
    });

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        action: 'PASSWORD_CHANGED',
        entityType: 'User',
        entityId: userId,
      },
    });

    return { message: 'Password updated successfully' };
  }

  /**
   * Generate password reset token
   */
  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return neutral message to avoid email enumeration
      return { message: 'If email exists, a password reset token has been generated' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    return {
      message: 'Password reset token generated successfully',
      resetToken, // Returned in prototype for API testing convenience
    };
  }

  /**
   * Reset password using token
   */
  async resetPassword(data: z.infer<typeof resetPasswordSchema>) {
    const tokenHash = crypto.createHash('sha256').update(data.token).digest('hex');

    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetRecord || resetRecord.used || resetRecord.expiresAt < new Date()) {
      throw new AppError('Password reset token is invalid or expired', 400);
    }

    const newHash = await hashPassword(data.newPassword);

    await prisma.user.update({
      where: { id: resetRecord.userId },
      data: { passwordHash: newHash },
    });

    await prisma.passwordResetToken.update({
      where: { id: resetRecord.id },
      data: { used: true },
    });

    return { message: 'Password reset successfully' };
  }

  /**
   * Verify email address with token
   */
  async verifyEmail(token: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const record = await prisma.emailVerificationToken.findUnique({
      where: { tokenHash },
    });

    if (!record || record.expiresAt < new Date()) {
      throw new AppError('Verification token is invalid or expired', 400);
    }

    await prisma.user.update({
      where: { id: record.userId },
      data: { isEmailVerified: true },
    });

    await prisma.emailVerificationToken.delete({
      where: { id: record.id },
    });

    return { message: 'Email verified successfully' };
  }
}
