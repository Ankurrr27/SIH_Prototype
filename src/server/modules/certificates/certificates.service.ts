import crypto from 'crypto';
import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { ApplicationStatus, CertificateStatus, TestResultStatus, SystemRole } from '@prisma/client';
import { generateCertificateNumber, generateVerificationToken } from '../../utils/certificate-number';
import { generateQRCodeDataUrl } from '../../utils/qr';
import { generateCertificatePdf } from '../../utils/pdf-generator';

export class CertificatesService {
  /**
   * Issue a digital verification certificate for an approved application
   */
  async issueCertificate(applicationId: string, issuingOfficerId: string) {
    const app = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        applicant: true,
        instrument: { include: { type: true } },
        inspection: { include: { officer: true } },
      },
    });

    if (!app) {
      throw new AppError('Application not found', 404);
    }

    if (
      app.status !== ApplicationStatus.CERTIFICATE_PENDING &&
      app.status !== ApplicationStatus.VERIFICATION_COMPLETED
    ) {
      throw new AppError(
        `Cannot issue certificate for application in status '${app.status}'. Verification must be completed and approved first.`,
        400
      );
    }

    if (!app.inspection || app.inspection.overallResult !== TestResultStatus.PASS) {
      throw new AppError('Cannot issue certificate for an inspection that has not passed verification', 400);
    }

    // Check if certificate already exists
    const existingCert = await prisma.certificate.findFirst({
      where: { applicationId, status: CertificateStatus.VALID },
    });

    if (existingCert) {
      return existingCert;
    }

    const certificateNo = generateCertificateNumber(app.district);
    const verificationToken = generateVerificationToken();
    const tokenHash = crypto.createHash('sha256').update(verificationToken).digest('hex');
    const qrCodeDataUrl = await generateQRCodeDataUrl(verificationToken);

    // Calculate validity period
    const validFrom = new Date();
    const validUntil = new Date();
    const months = app.instrument.type.verificationPeriodMonths || 12;
    validUntil.setMonth(validUntil.getMonth() + months);

    // Generate PDF document
    const pdfData = await generateCertificatePdf({
      certificateNo,
      verificationToken,
      applicantName: app.applicant.fullName,
      manufacturer: app.instrument.manufacturer,
      model: app.instrument.model,
      serialNumber: app.instrument.serialNumber,
      capacity: app.instrument.capacity,
      accuracyClass: app.instrument.accuracyClass,
      installationLocation: app.instrument.installationLocation,
      district: app.district,
      issueDate: validFrom,
      validFrom,
      validUntil,
      officerName: app.inspection.officer.fullName,
      officerDesignation: app.inspection.officer.designation,
      overallResult: app.inspection.overallResult,
      sealNumbers: app.inspection.sealNumbers,
    });

    const certificate = await prisma.$transaction(async (tx) => {
      const cert = await tx.certificate.create({
        data: {
          certificateNo,
          verificationToken,
          tokenHash,
          applicationId,
          instrumentId: app.instrumentId,
          issuingOfficerId,
          validFrom,
          validUntil,
          status: CertificateStatus.VALID,
          qrCodeDataUrl,
          pdfFileKey: pdfData.fileKey,
          pdfFileUrl: pdfData.fileUrl,
        },
        include: {
          instrument: { include: { type: true } },
          issuingOfficer: { select: { id: true, fullName: true } },
        },
      });

      // Update Application status to ISSUED
      await tx.application.update({
        where: { id: applicationId },
        data: { status: ApplicationStatus.ISSUED },
      });

      // Update Instrument status to VERIFIED and set next due date
      await tx.instrument.update({
        where: { id: app.instrumentId },
        data: {
          currentStatus: 'VERIFIED',
          previousCertificateNo: certificateNo,
          nextVerificationDue: validUntil,
        },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId,
          fromStatus: app.status,
          toStatus: ApplicationStatus.ISSUED,
          changedById: issuingOfficerId,
          remarks: `Digital certificate #${certificateNo} issued. Valid until ${validUntil.toISOString().split('T')[0]}`,
        },
      });

      return cert;
    });

    await prisma.auditLog.create({
      data: {
        actorId: issuingOfficerId,
        action: 'CERTIFICATE_ISSUED',
        entityType: 'Certificate',
        entityId: certificate.id,
        metadata: { certificateNo, validUntil },
      },
    });

    return certificate;
  }

  /**
   * Revoke certificate
   */
  async revokeCertificate(id: string, reason: string, officerId: string) {
    const cert = await prisma.certificate.findUnique({ where: { id } });
    if (!cert) throw new AppError('Certificate not found', 404);

    if (cert.status === CertificateStatus.REVOKED) {
      throw new AppError('Certificate is already revoked', 400);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const c = await tx.certificate.update({
        where: { id },
        data: {
          status: CertificateStatus.REVOKED,
          revocationReason: reason,
          revokedAt: new Date(),
        },
      });

      await tx.certificateRevision.create({
        data: {
          certificateId: id,
          revisionNo: 1,
          changes: 'STATUS_CHANGED_TO_REVOKED',
          reason,
          revisedById: officerId,
        },
      });

      return c;
    });

    await prisma.auditLog.create({
      data: {
        actorId: officerId,
        action: 'CERTIFICATE_REVOKED',
        entityType: 'Certificate',
        entityId: id,
        metadata: { reason },
      },
    });

    return updated;
  }

  /**
   * Public Verification by Verification Token (QR Scan)
   */
  async verifyByToken(token: string, ipAddress?: string, userAgent?: string) {
    const cert = await prisma.certificate.findUnique({
      where: { verificationToken: token },
      include: {
        instrument: {
          select: {
            manufacturer: true,
            model: true,
            serialNumber: true,
            capacity: true,
            installationLocation: true,
            district: true,
            type: { select: { name: true, category: true } },
          },
        },
        issuingOfficer: { select: { fullName: true, designation: true } },
      },
    });

    if (!cert) {
      return { status: 'NOT_FOUND', valid: false, message: 'Invalid or unknown verification token' };
    }

    // Record verification scan audit event
    await prisma.certificateVerification.create({
      data: {
        certificateId: cert.id,
        ipAddress,
        userAgent,
      },
    });

    // Check expiration
    const isExpired = new Date() > cert.validUntil;
    const finalStatus = isExpired ? CertificateStatus.EXPIRED : cert.status;

    return {
      status: finalStatus,
      valid: finalStatus === CertificateStatus.VALID,
      certificateNo: cert.certificateNo,
      issueDate: cert.issueDate,
      validFrom: cert.validFrom,
      validUntil: cert.validUntil,
      instrument: cert.instrument,
      issuingOfficer: cert.issuingOfficer.fullName,
      revocationReason: cert.revocationReason,
    };
  }

  /**
   * Public Search by Certificate Number
   */
  async verifyByCertificateNo(certificateNo: string, ipAddress?: string, userAgent?: string) {
    const cert = await prisma.certificate.findUnique({
      where: { certificateNo },
      include: {
        instrument: {
          select: {
            manufacturer: true,
            model: true,
            serialNumber: true,
            capacity: true,
            installationLocation: true,
            district: true,
            type: { select: { name: true, category: true } },
          },
        },
        issuingOfficer: { select: { fullName: true } },
      },
    });

    if (!cert) {
      return { status: 'NOT_FOUND', valid: false, message: 'Certificate number not found' };
    }

    await prisma.certificateVerification.create({
      data: {
        certificateId: cert.id,
        ipAddress,
        userAgent,
      },
    });

    const isExpired = new Date() > cert.validUntil;
    const finalStatus = isExpired ? CertificateStatus.EXPIRED : cert.status;

    return {
      status: finalStatus,
      valid: finalStatus === CertificateStatus.VALID,
      certificateNo: cert.certificateNo,
      issueDate: cert.issueDate,
      validFrom: cert.validFrom,
      validUntil: cert.validUntil,
      instrument: cert.instrument,
      issuingOfficer: cert.issuingOfficer.fullName,
      revocationReason: cert.revocationReason,
    };
  }

  /**
   * List Certificates
   */
  async listCertificates(query: any, userId: string, userRoles: SystemRole[]) {
    const { page = 1, limit = 10, status, search } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (userRoles.includes(SystemRole.APPLICANT) && !userRoles.includes(SystemRole.ADMIN)) {
      where.instrument = { ownerId: userId };
    }

    if (status) where.status = status as CertificateStatus;

    if (search) {
      where.OR = [
        { certificateNo: { contains: search, mode: 'insensitive' } },
        { instrument: { serialNumber: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [certificates, total] = await Promise.all([
      prisma.certificate.findMany({
        where,
        skip,
        take: parseInt(limit, 10),
        orderBy: { issueDate: 'desc' },
        include: {
          instrument: { include: { type: true } },
          issuingOfficer: { select: { id: true, fullName: true } },
        },
      }),
      prisma.certificate.count({ where }),
    ]);

    return {
      certificates,
      meta: { page: parseInt(page, 10), limit: parseInt(limit, 10), total, totalPages: Math.ceil(total / parseInt(limit, 10)) },
    };
  }

  /**
   * Get single certificate
   */
  async getCertificateById(id: string) {
    const cert = await prisma.certificate.findUnique({
      where: { id },
      include: {
        instrument: { include: { type: true, owner: { select: { fullName: true, email: true } } } },
        issuingOfficer: { select: { id: true, fullName: true, designation: true } },
        application: { select: { applicationNo: true, district: true } },
        revisions: true,
        verifications: { take: 10, orderBy: { verifiedAt: 'desc' } },
      },
    });

    if (!cert) throw new AppError('Certificate not found', 404);
    return cert;
  }
}
