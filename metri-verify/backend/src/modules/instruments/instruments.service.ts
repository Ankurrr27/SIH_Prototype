import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { SystemRole } from '@prisma/client';
import { z } from 'zod';
import {
  createInstrumentSchema,
  updateInstrumentSchema,
  createInstrumentTypeSchema,
  updateInstrumentTypeSchema,
  listInstrumentsQuerySchema,
} from './instruments.schemas';

export class InstrumentsService {
  /**
   * Register a new instrument
   */
  async createInstrument(data: z.infer<typeof createInstrumentSchema>, ownerId: string) {
    const type = await prisma.instrumentType.findUnique({
      where: { id: data.typeId },
    });

    if (!type) {
      throw new AppError('Invalid instrument type ID', 400);
    }

    const duplicate = await prisma.instrument.findUnique({
      where: {
        serialNumber_manufacturer: {
          serialNumber: data.serialNumber,
          manufacturer: data.manufacturer,
        },
      },
    });

    if (duplicate) {
      throw new AppError(
        `Instrument with serial number '${data.serialNumber}' and manufacturer '${data.manufacturer}' already exists`,
        409
      );
    }

    const instrument = await prisma.instrument.create({
      data: {
        ...data,
        purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : null,
        ownerId,
      },
      include: {
        type: true,
        owner: { select: { id: true, fullName: true, email: true } },
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: ownerId,
        action: 'INSTRUMENT_REGISTERED',
        entityType: 'Instrument',
        entityId: instrument.id,
        metadata: { serialNumber: instrument.serialNumber, model: instrument.model },
      },
    });

    return instrument;
  }

  /**
   * List instruments with role-based scoping and pagination
   */
  async listInstruments(
    query: z.infer<typeof listInstrumentsQuerySchema>,
    userId: string,
    userRoles: SystemRole[],
    userDistrict?: string | null
  ) {
    const { page = 1, limit = 10, typeId, status, district, search } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    // APPLICANTS can only view their own registered instruments
    if (userRoles.includes(SystemRole.APPLICANT) && !userRoles.includes(SystemRole.ADMIN)) {
      where.ownerId = userId;
    }

    // LMOs are filtered by assigned district unless overriding
    if (userRoles.includes(SystemRole.LMO) && !userRoles.includes(SystemRole.ADMIN)) {
      if (userDistrict) where.district = userDistrict;
    }

    if (typeId) where.typeId = typeId;
    if (status) where.currentStatus = status;
    if (district) where.district = district;

    if (search) {
      where.OR = [
        { serialNumber: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { manufacturer: { contains: search, mode: 'insensitive' } },
        { installationLocation: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [instruments, total] = await Promise.all([
      prisma.instrument.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          type: true,
          owner: { select: { id: true, fullName: true, email: true } },
          _count: { select: { applications: true, certificates: true } },
        },
      }),
      prisma.instrument.count({ where }),
    ]);

    return {
      instruments,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single instrument details with applications and certificates history
   */
  async getInstrumentById(id: string, userId: string, userRoles: SystemRole[]) {
    const instrument = await prisma.instrument.findUnique({
      where: { id },
      include: {
        type: {
          include: { testDefinitions: true },
        },
        owner: { select: { id: true, fullName: true, email: true, mobile: true } },
        applications: {
          orderBy: { createdAt: 'desc' },
          select: { id: true, applicationNo: true, type: true, status: true, createdAt: true },
        },
        certificates: {
          orderBy: { issueDate: 'desc' },
          select: { id: true, certificateNo: true, status: true, issueDate: true, validUntil: true },
        },
      },
    });

    if (!instrument) {
      throw new AppError('Instrument not found', 404);
    }

    // Ensure applicant can only view their own instrument
    if (userRoles.includes(SystemRole.APPLICANT) && !userRoles.includes(SystemRole.ADMIN)) {
      if (instrument.ownerId !== userId) {
        throw new AppError('Forbidden: You do not own this instrument', 403);
      }
    }

    return instrument;
  }

  /**
   * Update instrument details
   */
  async updateInstrument(
    id: string,
    data: z.infer<typeof updateInstrumentSchema>,
    userId: string,
    userRoles: SystemRole[]
  ) {
    const instrument = await prisma.instrument.findUnique({ where: { id } });

    if (!instrument) {
      throw new AppError('Instrument not found', 404);
    }

    if (userRoles.includes(SystemRole.APPLICANT) && !userRoles.includes(SystemRole.ADMIN)) {
      if (instrument.ownerId !== userId) {
        throw new AppError('Forbidden: You do not own this instrument', 403);
      }
    }

    const updated = await prisma.instrument.update({
      where: { id },
      data: {
        ...data,
        purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : undefined,
      },
      include: { type: true },
    });

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        action: 'INSTRUMENT_UPDATED',
        entityType: 'Instrument',
        entityId: id,
        metadata: data,
      },
    });

    return updated;
  }

  /**
   * Delete instrument
   */
  async deleteInstrument(id: string, userId: string, userRoles: SystemRole[]) {
    const instrument = await prisma.instrument.findUnique({
      where: { id },
      include: { _count: { select: { applications: true, certificates: true } } },
    });

    if (!instrument) {
      throw new AppError('Instrument not found', 404);
    }

    if (userRoles.includes(SystemRole.APPLICANT) && !userRoles.includes(SystemRole.ADMIN)) {
      if (instrument.ownerId !== userId) {
        throw new AppError('Forbidden: You do not own this instrument', 403);
      }
    }

    if (instrument._count.applications > 0 || instrument._count.certificates > 0) {
      throw new AppError(
        'Cannot delete instrument with existing verification applications or certificates',
        400
      );
    }

    await prisma.instrument.delete({ where: { id } });

    return { message: 'Instrument deleted successfully' };
  }

  // ==========================================
  // INSTRUMENT TYPES MANAGEMENT (ADMIN)
  // ==========================================

  async listInstrumentTypes() {
    return prisma.instrumentType.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      include: { testDefinitions: true },
    });
  }

  async createInstrumentType(data: z.infer<typeof createInstrumentTypeSchema>, adminId: string) {
    const existing = await prisma.instrumentType.findUnique({
      where: { code: data.code },
    });

    if (existing) {
      throw new AppError(`Instrument type code '${data.code}' already exists`, 409);
    }

    const type = await prisma.instrumentType.create({
      data,
    });

    await prisma.auditLog.create({
      data: {
        actorId: adminId,
        action: 'INSTRUMENT_TYPE_CREATED',
        entityType: 'InstrumentType',
        entityId: type.id,
        metadata: { code: type.code, name: type.name },
      },
    });

    return type;
  }

  async updateInstrumentType(
    id: string,
    data: z.infer<typeof updateInstrumentTypeSchema>,
    adminId: string
  ) {
    const type = await prisma.instrumentType.findUnique({ where: { id } });
    if (!type) {
      throw new AppError('Instrument type not found', 404);
    }

    const updated = await prisma.instrumentType.update({
      where: { id },
      data,
    });

    return updated;
  }
}
