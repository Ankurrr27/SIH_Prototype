import { Request, Response, NextFunction } from 'express';
import { InstrumentsService } from './instruments.service';
import { sendSuccess } from '../../utils/response';

const service = new InstrumentsService();

export class InstrumentsController {
  public createInstrument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.createInstrument(req.body, req.user!.userId);
      return sendSuccess(res, 'Instrument registered successfully', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public listInstruments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { instruments, meta } = await service.listInstruments(
        req.query as any,
        req.user!.userId,
        req.user!.roles,
        req.user!.district
      );
      return sendSuccess(res, 'Instruments list fetched successfully', instruments, 200, meta);
    } catch (error) {
      next(error);
    }
  };

  public getInstrumentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getInstrumentById(req.params.id, req.user!.userId, req.user!.roles);
      return sendSuccess(res, 'Instrument details fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public updateInstrument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.updateInstrument(
        req.params.id,
        req.body,
        req.user!.userId,
        req.user!.roles
      );
      return sendSuccess(res, 'Instrument details updated successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public deleteInstrument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.deleteInstrument(req.params.id, req.user!.userId, req.user!.roles);
      return sendSuccess(res, result.message, null);
    } catch (error) {
      next(error);
    }
  };

  // Instrument Types Handlers
  public listInstrumentTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.listInstrumentTypes();
      return sendSuccess(res, 'Instrument types fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public createInstrumentType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.createInstrumentType(req.body, req.user!.userId);
      return sendSuccess(res, 'Instrument type created successfully', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public updateInstrumentType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.updateInstrumentType(req.params.id, req.body, req.user!.userId);
      return sendSuccess(res, 'Instrument type updated successfully', result);
    } catch (error) {
      next(error);
    }
  };
}
