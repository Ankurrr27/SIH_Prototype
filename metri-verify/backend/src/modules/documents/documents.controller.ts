import { Request, Response, NextFunction } from 'express';
import { DocumentsService } from './documents.service';
import { sendSuccess } from '../../utils/response';
import { AppError } from '../../middleware/error.middleware';

const service = new DocumentsService();

export class DocumentsController {
  public uploadDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new AppError('No file provided in upload request', 400);
      }

      const { applicationId, inspectionId, documentType, caption } = req.body;

      if (applicationId) {
        const doc = await service.uploadApplicationDocument(
          applicationId,
          documentType || 'SUPPORTING_DOCUMENT',
          req.file,
          req.user!.userId
        );
        return sendSuccess(res, 'Application document uploaded successfully', doc, 201);
      }

      if (inspectionId) {
        const evidence = await service.uploadInspectionEvidence(
          inspectionId,
          caption,
          req.file,
          req.user!.userId
        );
        return sendSuccess(res, 'Inspection evidence uploaded successfully', evidence, 201);
      }

      throw new AppError('Must specify either applicationId or inspectionId for upload', 400);
    } catch (error) {
      next(error);
    }
  };

  public getDocumentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getDocumentById(req.params.id);
      return sendSuccess(res, 'Document details fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.deleteDocument(req.params.id, req.user!.userId);
      return sendSuccess(res, result.message, null);
    } catch (error) {
      next(error);
    }
  };
}
