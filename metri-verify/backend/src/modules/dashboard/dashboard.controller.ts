import { Request, Response, NextFunction } from 'express';
import { DashboardService } from './dashboard.service';
import { sendSuccess } from '../../utils/response';

const service = new DashboardService();

export class DashboardController {
  public getApplicantDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getApplicantDashboard(req.user!.userId);
      return sendSuccess(res, 'Applicant dashboard metrics fetched', result);
    } catch (error) {
      next(error);
    }
  };

  public getLMODashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getLMODashboard(req.user!.userId, req.user!.district);
      return sendSuccess(res, 'LMO officer dashboard metrics fetched', result);
    } catch (error) {
      next(error);
    }
  };

  public getGATCDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getGATCDashboard(req.user!.userId);
      return sendSuccess(res, 'GATC centre dashboard metrics fetched', result);
    } catch (error) {
      next(error);
    }
  };

  public getAdminDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getAdminDashboard();
      return sendSuccess(res, 'Admin master dashboard metrics fetched', result);
    } catch (error) {
      next(error);
    }
  };
}
