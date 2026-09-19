import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import fs from 'fs';
import path from 'path';

export class DocumentsService {
  /**
   * Save uploaded document metadata for application
   */
  async uploadApplicationDocument(
    applicationId: string,
    documentType: string,
    file: Express.Multer.File,
    uploaderId: string
  ) {
    const app = await prisma.application.findUnique({ where: { id: applicationId } });
    if (!app) throw new AppError('Application not found', 404);

    const doc = await prisma.applicationDocument.create({
      data: {
        applicationId,
        documentType,
        fileName: file.originalname,
        fileKey: file.filename,
        fileUrl: `/uploads/${file.filename}`,
        mimeType: file.mimetype,
        fileSize: file.size,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: uploaderId,
        action: 'DOCUMENT_UPLOADED',
        entityType: 'ApplicationDocument',
        entityId: doc.id,
        metadata: { applicationId, fileName: doc.fileName },
      },
    });

    return doc;
  }

  /**
   * Save uploaded inspection evidence
   */
  async uploadInspectionEvidence(
    inspectionId: string,
    caption: string | undefined,
    file: Express.Multer.File,
    uploaderId: string
  ) {
    const insp = await prisma.inspection.findUnique({ where: { id: inspectionId } });
    if (!insp) throw new AppError('Inspection not found', 404);

    const evidence = await prisma.inspectionEvidence.create({
      data: {
        inspectionId,
        caption,
        fileName: file.originalname,
        fileKey: file.filename,
        fileUrl: `/uploads/${file.filename}`,
        mimeType: file.mimetype,
        fileSize: file.size,
      },
    });

    return evidence;
  }

  /**
   * Get document metadata by ID
   */
  async getDocumentById(id: string) {
    const doc = await prisma.applicationDocument.findUnique({ where: { id } });
    if (doc) return doc;

    const evidence = await prisma.inspectionEvidence.findUnique({ where: { id } });
    if (evidence) return evidence;

    throw new AppError('Document not found', 404);
  }

  /**
   * Delete document
   */
  async deleteDocument(id: string, userId: string) {
    const doc = await prisma.applicationDocument.findUnique({ where: { id } });
    if (doc) {
      // Remove physical file
      const filePath = path.resolve(process.cwd(), 'uploads', doc.fileKey);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await prisma.applicationDocument.delete({ where: { id } });
      return { message: 'Document deleted successfully' };
    }

    const evidence = await prisma.inspectionEvidence.findUnique({ where: { id } });
    if (evidence) {
      const filePath = path.resolve(process.cwd(), 'uploads', evidence.fileKey);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await prisma.inspectionEvidence.delete({ where: { id } });
      return { message: 'Evidence deleted successfully' };
    }

    throw new AppError('Document not found', 404);
  }
}
