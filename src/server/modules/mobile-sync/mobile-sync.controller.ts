import { Request, Response, NextFunction } from 'express';
import { MobileSyncService } from './mobile-sync.service';
import { sendSuccess } from '../../utils/response';

const service = new MobileSyncService();

export class MobileSyncController {
  public getFieldOfficerTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getFieldOfficerTasks(req.user!.userId);
      return sendSuccess(res, 'Field officer tasks fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public syncOfflineData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.syncOfflineData(req.body, req.user!.userId);
      return sendSuccess(res, 'Mobile batch sync processed', result);
    } catch (error) {
      next(error);
    }
  };
}
