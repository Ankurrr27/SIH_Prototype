import { Request, Response, NextFunction } from 'express';
import { ApplicationsService } from './applications.service';
import { sendSuccess } from '../../utils/response';

const service = new ApplicationsService();

export class ApplicationsController {
  public createApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.createApplication(req.body, req.user!.userId);
      return sendSuccess(res, 'Application draft created successfully', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public submitApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.submitApplication(req.params.id, req.user!.userId);
      return sendSuccess(res, 'Application submitted successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public reviewApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.reviewApplication(req.params.id, req.user!.userId);
      return sendSuccess(res, 'Application review started', result);
    } catch (error) {
      next(error);
    }
  };

  public requestCorrection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { correctionNotes } = req.body;
      const result = await service.requestCorrection(req.params.id, correctionNotes, req.user!.userId);
      return sendSuccess(res, 'Correction requested from applicant', result);
    } catch (error) {
      next(error);
    }
  };

  public approveForScheduling = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.approveForScheduling(req.params.id, req.user!.userId);
      return sendSuccess(res, 'Application approved for scheduling', result);
    } catch (error) {
      next(error);
    }
  };

  public rejectApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rejectionReason } = req.body;
      const result = await service.rejectApplication(req.params.id, rejectionReason, req.user!.userId);
      return sendSuccess(res, 'Application rejected', result);
    } catch (error) {
      next(error);
    }
  };

  public cancelApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.cancelApplication(req.params.id, req.user!.userId);
      return sendSuccess(res, 'Application cancelled successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public listApplications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { applications, meta } = await service.listApplications(
        req.query as any,
        req.user!.userId,
        req.user!.roles,
        req.user!.district
      );
      return sendSuccess(res, 'Applications list fetched successfully', applications, 200, meta);
    } catch (error) {
      next(error);
    }
  };

  public getApplicationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getApplicationById(req.params.id, req.user!.userId, req.user!.roles);
      return sendSuccess(res, 'Application details fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public getApplicationHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getApplicationHistory(req.params.id);
      return sendSuccess(res, 'Application status timeline fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };
}
