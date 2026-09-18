import { Request, Response, NextFunction } from 'express';
import { SystemRole } from '@prisma/client';
import { AppError } from './error.middleware';

export const requireRoles = (...allowedRoles: SystemRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      throw new AppError(
        `Forbidden: Access requires one of the following roles: [${allowedRoles.join(', ')}]`,
        403
      );
    }

    next();
  };
};
