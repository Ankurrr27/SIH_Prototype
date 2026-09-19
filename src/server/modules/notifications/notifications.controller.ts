import { Request, Response, NextFunction } from 'express';
import { NotificationsService } from './notifications.service';
import { sendSuccess } from '../../utils/response';

const service = new NotificationsService();

export class NotificationsController {
  public getUserNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const { notifications, unreadCount, meta } = await service.getUserNotifications(
        req.user!.userId,
        page,
        limit
      );
      return sendSuccess(res, 'Notifications fetched successfully', { notifications, unreadCount }, 200, meta);
    } catch (error) {
      next(error);
    }
  };

  public markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.markAsRead(req.params.id, req.user!.userId);
      return sendSuccess(res, 'Notification marked as read', result);
    } catch (error) {
      next(error);
    }
  };

  public markAllAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.markAllAsRead(req.user!.userId);
      return sendSuccess(res, result.message, null);
    } catch (error) {
      next(error);
    }
  };
}
