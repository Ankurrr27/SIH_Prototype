import { Request, Response, NextFunction } from 'express';
import { SchedulingService } from './scheduling.service';
import { sendSuccess } from '../../utils/response';

const service = new SchedulingService();

export class SchedulingController {
  public createSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.createSchedule(req.body, req.user!.userId);
      return sendSuccess(res, 'Appointment schedule created successfully', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public reschedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.reschedule(req.params.id, req.body, req.user!.userId);
      return sendSuccess(res, 'Appointment rescheduled successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public cancelSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.cancelSchedule(req.params.id, req.user!.userId);
      return sendSuccess(res, 'Schedule cancelled successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public listSchedules = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { schedules, meta } = await service.listSchedules(req.query as any);
      return sendSuccess(res, 'Schedules list fetched successfully', schedules, 200, meta);
    } catch (error) {
      next(error);
    }
  };

  public createAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.createAssignment(req.body, req.user!.userId);
      return sendSuccess(res, 'Task assigned successfully', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public listAssignments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { assignments, meta } = await service.listAssignments(
        req.query as any,
        req.user!.userId,
        req.user!.roles
      );
      return sendSuccess(res, 'Assignments list fetched successfully', assignments, 200, meta);
    } catch (error) {
      next(error);
    }
  };

  public getOfficerAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const district = req.query.district as string;
      const result = await service.getOfficerAvailability(district);
      return sendSuccess(res, 'Officer availability report fetched', result);
    } catch (error) {
      next(error);
    }
  };

  public getGATCAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const district = req.query.district as string;
      const result = await service.getGATCAvailability(district);
      return sendSuccess(res, 'GATC availability report fetched', result);
    } catch (error) {
      next(error);
    }
  };
}
