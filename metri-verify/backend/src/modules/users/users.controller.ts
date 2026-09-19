import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { sendSuccess } from '../../utils/response';

const usersService = new UsersService();

export class UsersController {
  public getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await usersService.getProfile(req.user!.userId);
      return sendSuccess(res, 'User profile fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public updateMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await usersService.updateProfile(req.user!.userId, req.body);
      return sendSuccess(res, 'User profile updated successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { users, meta } = await usersService.listUsers(req.query as any);
      return sendSuccess(res, 'Users list fetched successfully', users, 200, meta);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await usersService.getProfile(req.params.id);
      return sendSuccess(res, 'User details fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await usersService.updateUserStatus(
        req.params.id,
        req.body.isActive,
        req.user!.userId
      );
      return sendSuccess(res, `User status updated to ${req.body.isActive ? 'Active' : 'Inactive'}`, result);
    } catch (error) {
      next(error);
    }
  };
}
