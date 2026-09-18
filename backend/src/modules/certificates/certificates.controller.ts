import { Request, Response, NextFunction } from 'express';
import { CertificatesService } from './certificates.service';
import { sendSuccess } from '../../utils/response';
import path from 'path';

const service = new CertificatesService();

export class CertificatesController {
  public issueCertificate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { applicationId } = req.body;
      const result = await service.issueCertificate(applicationId, req.user!.userId);
      return sendSuccess(res, 'Digital verification certificate issued successfully', result, 201);
    } catch (error) {
      next(error);
    }
  };

  public revokeCertificate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reason } = req.body;
      const result = await service.revokeCertificate(req.params.id, reason, req.user!.userId);
      return sendSuccess(res, 'Certificate revoked successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public listCertificates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { certificates, meta } = await service.listCertificates(
        req.query,
        req.user!.userId,
        req.user!.roles
      );
      return sendSuccess(res, 'Certificates list fetched successfully', certificates, 200, meta);
    } catch (error) {
      next(error);
    }
  };

  public getCertificateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getCertificateById(req.params.id);
      return sendSuccess(res, 'Certificate details fetched successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public downloadCertificate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cert = await service.getCertificateById(req.params.id);
      if (!cert.pdfFileKey) {
        return res.status(404).json({ success: false, message: 'PDF file not available for certificate' });
      }

      const filePath = path.resolve(process.cwd(), 'uploads', cert.pdfFileKey);
      return res.download(filePath, `${cert.certificateNo}.pdf`);
    } catch (error) {
      next(error);
    }
  };

  // Public Verification Handlers
  public verifyByToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.params;
      const result = await service.verifyByToken(token, req.ip, req.headers['user-agent']);
      return sendSuccess(res, 'Verification check completed', result);
    } catch (error) {
      next(error);
    }
  };

  public verifyByCertificateNo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { certificateNo } = req.params;
      const result = await service.verifyByCertificateNo(certificateNo, req.ip, req.headers['user-agent']);
      return sendSuccess(res, 'Certificate lookup completed', result);
    } catch (error) {
      next(error);
    }
  };
}
