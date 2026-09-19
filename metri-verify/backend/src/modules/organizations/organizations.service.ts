import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { OrganizationType } from '@prisma/client';
import { z } from 'zod';
import {
  createOrganizationSchema,
  updateOrganizationSchema,
  addMemberSchema,
  listOrganizationsQuerySchema,
} from './organizations.schemas';

export class OrganizationsService {
  async createOrganization(data: z.infer<typeof createOrganizationSchema>, creatorUserId: string) {
    const existing = await prisma.organization.findUnique({
      where: { code: data.code },
    });

    if (existing) {
      throw new AppError(`Organization code '${data.code}' already exists`, 409);
    }

    const org = await prisma.organization.create({
      data: {
        ...data,
        members: {
          create: {
            userId: creatorUserId,
            roleInOrg: 'OWNER',
          },
        },
      },
      include: {
        members: {
          include: { user: { select: { id: true, fullName: true, email: true } } },
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: creatorUserId,
        action: 'ORGANIZATION_CREATED',
        entityType: 'Organization',
        entityId: org.id,
        metadata: { name: org.name, type: org.type, code: org.code },
      },
    });

    return org;
  }

  async listOrganizations(query: z.infer<typeof listOrganizationsQuerySchema>) {
    const { page = 1, limit = 10, type, district, search } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (type) where.type = type as OrganizationType;
    if (district) where.district = district;

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { registrationNo: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [organizations, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: { select: { members: true } },
        },
      }),
      prisma.organization.count({ where }),
    ]);

    return {
      organizations,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getOrganizationById(id: string) {
    const org = await prisma.organization.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
                mobile: true,
                designation: true,
              },
            },
          },
        },
      },
    });

    if (!org) {
      throw new AppError('Organization not found', 404);
    }

    return org;
  }

  async updateOrganization(id: string, data: z.infer<typeof updateOrganizationSchema>, actorUserId: string) {
    const org = await prisma.organization.findUnique({ where: { id } });
    if (!org) {
      throw new AppError('Organization not found', 404);
    }

    const updated = await prisma.organization.update({
      where: { id },
      data,
    });

    await prisma.auditLog.create({
      data: {
        actorId: actorUserId,
        action: 'ORGANIZATION_UPDATED',
        entityType: 'Organization',
        entityId: id,
        metadata: data,
      },
    });

    return updated;
  }

  async addMember(orgId: string, data: z.infer<typeof addMemberSchema>, actorUserId: string) {
    const org = await prisma.organization.findUnique({ where: { id: orgId } });
    if (!org) {
      throw new AppError('Organization not found', 404);
    }

    const user = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const member = await prisma.organizationMember.upsert({
      where: {
        organizationId_userId: {
          organizationId: orgId,
          userId: data.userId,
        },
      },
      update: { roleInOrg: data.roleInOrg },
      create: {
        organizationId: orgId,
        userId: data.userId,
        roleInOrg: data.roleInOrg,
      },
      include: {
        user: { select: { id: true, fullName: true, email: true } },
      },
    });

    return member;
  }

  async removeMember(orgId: string, userId: string, actorUserId: string) {
    await prisma.organizationMember.delete({
      where: {
        organizationId_userId: {
          organizationId: orgId,
          userId,
        },
      },
    });

    return { message: 'Member removed from organization' };
  }
}
