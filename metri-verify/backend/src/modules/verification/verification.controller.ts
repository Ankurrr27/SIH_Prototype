import { Request, Response, NextFunction } from 'express';
import { VerificationService } from './verification.service';
import { sendSuccess } from '../../utils/response';

const service = new VerificationService();

export class VerificationController {
  public createInspection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.createInspection(req.body, req.user!.userId);
      return sendSuccess(res, 'Inspection initialized successfully', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public startInspection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.startInspection(req.params.id, req.user!.userId);
      return sendSuccess(res, 'Inspection status changed to IN_PROGRESS', result);
    } catch (error) {
      next(error);
    }
  };

  public recordTestResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.recordTestResult(req.params.id, req.body, req.user!.userId);
      return sendSuccess(res, 'Test reading recorded and evaluated successfully', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public submitInspection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.submitInspection(req.params.id, req.user!.userId);
      return sendSuccess(res, 'Inspection report submitted successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public approveInspection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { remarks } = req.body;
      const result = await service.approveInspection(req.params.id, req.user!.userId, remarks);
      return sendSuccess(res, 'Inspection report approved successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public listInspections = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inspections, meta } = await service.listInspections(req.query as any, req.user!.userId, req.user!.roles);
      return sendSuccess(res, 'Inspections list fetched successfully', inspections, 200, meta);
    } catch (error) {
      next(error);
    }
  };

  public getInspectionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getInspectionById(req.params.id);
      return sendSuccess(res, 'Inspection details fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };
}
