import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { sendSuccess } from '../../utils/response';

const authService = new AuthService();

export class AuthController {
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.register(req.body);
      return sendSuccess(res, 'User registered successfully', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body, req.ip, req.headers['user-agent']);
      return sendSuccess(res, 'Login successful', result, 200);
    } catch (error) {
      next(error);
    }
  };

  public refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refresh(refreshToken);
      return sendSuccess(res, 'Tokens refreshed successfully', result, 200);
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const userId = req.user?.userId;
      const result = await authService.logout(refreshToken, userId);
      return sendSuccess(res, result.message, null, 200);
    } catch (error) {
      next(error);
    }
  };

  public getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await authService.getMe(userId);
      return sendSuccess(res, 'User profile fetched successfully', result, 200);
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await authService.changePassword(userId, req.body);
      return sendSuccess(res, result.message, null, 200);
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await authService.forgotPassword(email);
      return sendSuccess(res, result.message, result, 200);
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.resetPassword(req.body);
      return sendSuccess(res, result.message, null, 200);
    } catch (error) {
      next(error);
    }
  };

  public verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;
      const result = await authService.verifyEmail(token);
      return sendSuccess(res, result.message, null, 200);
    } catch (error) {
      next(error);
    }
  };
}
