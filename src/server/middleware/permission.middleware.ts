import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { AppError } from './error.middleware';

export const requirePermissions = (...requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    // Admins bypass granular permission checks
    if (req.user.roles.includes('ADMIN')) {
      return next();
    }

    try {
      const userPermissions = await prisma.permission.findMany({
        where: {
          roles: {
            some: {
              role: {
                name: { in: req.user.roles },
              },
            },
          },
        },
        select: { code: true },
      });

      const userPermCodes = userPermissions.map((p) => p.code);
      const hasAllPermissions = requiredPermissions.every((code) => userPermCodes.includes(code));

      if (!hasAllPermissions) {
        throw new AppError(
          `Forbidden: Missing required permissions: [${requiredPermissions.join(', ')}]`,
          403
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
