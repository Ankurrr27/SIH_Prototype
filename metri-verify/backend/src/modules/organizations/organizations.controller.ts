import { Request, Response, NextFunction } from 'express';
import { OrganizationsService } from './organizations.service';
import { sendSuccess } from '../../utils/response';

const service = new OrganizationsService();

export class OrganizationsController {
  public createOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.createOrganization(req.body, req.user!.userId);
      return sendSuccess(res, 'Organization created successfully', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public listOrganizations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { organizations, meta } = await service.listOrganizations(req.query as any);
      return sendSuccess(res, 'Organizations list fetched successfully', organizations, 200, meta);
    } catch (error) {
      next(error);
    }
  };

  public getOrganizationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getOrganizationById(req.params.id);
      return sendSuccess(res, 'Organization details fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public updateOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.updateOrganization(req.params.id, req.body, req.user!.userId);
      return sendSuccess(res, 'Organization updated successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public addMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.addMember(req.params.id, req.body, req.user!.userId);
      return sendSuccess(res, 'Member added to organization', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public removeMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.removeMember(req.params.id, req.params.userId, req.user!.userId);
      return sendSuccess(res, result.message, null);
    } catch (error) {
      next(error);
    }
  };
}
