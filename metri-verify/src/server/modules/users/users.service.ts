import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { SystemRole } from '@prisma/client';
import { z } from 'zod';
import { updateProfileSchema, listUsersQuerySchema } from './users.schemas';

export class UsersService {
  async getProfile(userId: string) {
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
          select: { role: { select: { name: true } } },
        },
        organizationMemberships: {
          select: {
            organization: { select: { id: true, name: true, code: true, type: true } },
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

  async updateProfile(userId: string, data: z.infer<typeof updateProfileSchema>) {
    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        fullName: true,
        mobile: true,
        designation: true,
        district: true,
        state: true,
        updatedAt: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        action: 'PROFILE_UPDATED',
        entityType: 'User',
        entityId: userId,
        metadata: data,
      },
    });

    return updated;
  }

  async listUsers(query: z.infer<typeof listUsersQuerySchema>) {
    const { page = 1, limit = 10, role, district, search } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (district) where.district = district;

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { mobile: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.roles = {
        some: {
          role: { name: role as SystemRole },
        },
      };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          fullName: true,
          mobile: true,
          district: true,
          isActive: true,
          createdAt: true,
          roles: {
            select: { role: { select: { name: true } } },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    const formatted = users.map((u) => ({
      ...u,
      roles: u.roles.map((r) => r.role.name),
    }));

    return {
      users: formatted,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateUserStatus(targetUserId: string, isActive: boolean, adminUserId: string) {
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      throw new AppError('Target user not found', 404);
    }

    const updated = await prisma.user.update({
      where: { id: targetUserId },
      data: { isActive },
      select: { id: true, email: true, fullName: true, isActive: true },
    });

    await prisma.auditLog.create({
      data: {
        actorId: adminUserId,
        action: 'USER_STATUS_UPDATED',
        entityType: 'User',
        entityId: targetUserId,
        metadata: { isActive },
      },
    });

    return updated;
  }
}
