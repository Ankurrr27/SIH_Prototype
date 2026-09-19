import { PrismaClient, SystemRole, OrganizationType, ApplicationType, ApplicationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Legal Metrology database seeding...');

  // 1. Seed System Roles
  console.log('📦 Seeding System Roles...');
  const roleApplicant = await prisma.role.upsert({
    where: { name: SystemRole.APPLICANT },
    update: {},
    create: { name: SystemRole.APPLICANT, description: 'Applicant business / instrument owner' },
  });

  const roleLMO = await prisma.role.upsert({
    where: { name: SystemRole.LMO },
    update: {},
    create: { name: SystemRole.LMO, description: 'Legal Metrology Officer (Inspector)' },
  });

  const roleGATC = await prisma.role.upsert({
    where: { name: SystemRole.GATC },
    update: {},
    create: { name: SystemRole.GATC, description: 'Government Approved Test Centre' },
  });

  const roleAdmin = await prisma.role.upsert({
    where: { name: SystemRole.ADMIN },
    update: {},
    create: { name: SystemRole.ADMIN, description: 'Department System Administrator' },
  });

  // 2. Seed Permissions
  console.log('🔐 Seeding System Permissions...');
  const permissionsData = [
    { code: 'user:manage', module: 'users', description: 'Manage system users' },
    { code: 'instrument:create', module: 'instruments', description: 'Register new instruments' },
    { code: 'instrument:read', module: 'instruments', description: 'View instruments' },
    { code: 'application:create', module: 'applications', description: 'Submit verification applications' },
    { code: 'application:review', module: 'applications', description: 'Review & approve applications' },
    { code: 'schedule:assign', module: 'scheduling', description: 'Assign LMO/GATC for verification' },
    { code: 'inspection:record', module: 'inspections', description: 'Record inspection test readings' },
    { code: 'certificate:issue', module: 'certificates', description: 'Issue digital verification certificates' },
    { code: 'audit:view', module: 'audit', description: 'View system audit logs' },
  ];

  for (const perm of permissionsData) {
    await prisma.permission.upsert({
      where: { code: perm.code },
      update: {},
      create: perm,
    });
  }

  const permissions = await prisma.permission.findMany({
    where: { code: { in: permissionsData.map(({ code }) => code) } },
  });

  const rolePermissions: Array<{ roleId: string; permissionId: string }> = [
    ...permissions
      .filter(({ code }) => ['instrument:create', 'instrument:read', 'application:create'].includes(code))
      .map(({ id }) => ({ roleId: roleApplicant.id, permissionId: id })),
    ...permissions
      .filter(({ code }) => ['instrument:read', 'application:review', 'inspection:record'].includes(code))
      .map(({ id }) => ({ roleId: roleLMO.id, permissionId: id })),
    ...permissions
      .filter(({ code }) => ['instrument:read', 'inspection:record'].includes(code))
      .map(({ id }) => ({ roleId: roleGATC.id, permissionId: id })),
    ...permissions
      .filter(({ code }) => ['user:manage', 'instrument:read', 'application:review', 'schedule:assign', 'certificate:issue', 'audit:view'].includes(code))
      .map(({ id }) => ({ roleId: roleAdmin.id, permissionId: id })),
  ];

  for (const rolePermission of rolePermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: rolePermission,
      },
      update: {},
      create: rolePermission,
    });
  }

  // 3. Seed Demo Users
  console.log('👤 Seeding Demo Users...');
  const defaultPasswordHash = await bcrypt.hash('Password@123', 10);

  // Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@legalmetrology.gov.in' },
    update: {},
    create: {
      email: 'admin@legalmetrology.gov.in',
      mobile: '9876543210',
      passwordHash: defaultPasswordHash,
      fullName: 'System Administrator',
      designation: 'Chief Administrator',
      district: 'Central Delhi',
      state: 'Delhi',
      isEmailVerified: true,
      isMobileVerified: true,
      roles: { create: [{ roleId: roleAdmin.id }] },
    },
  });

  // LMO Officer User
  const lmoUser = await prisma.user.upsert({
    where: { email: 'lmo.delhi@legalmetrology.gov.in' },
    update: {},
    create: {
      email: 'lmo.delhi@legalmetrology.gov.in',
      mobile: '9876543211',
      passwordHash: defaultPasswordHash,
      fullName: 'Rajesh Kumar (LMO)',
      designation: 'Senior Legal Metrology Officer',
      district: 'North Delhi',
      state: 'Delhi',
      isEmailVerified: true,
      isMobileVerified: true,
      roles: { create: [{ roleId: roleLMO.id }] },
    },
  });

  // GATC User
  const gatcUser = await prisma.user.upsert({
    where: { email: 'gatc.north@testing.org.in' },
    update: {},
    create: {
      email: 'gatc.north@testing.org.in',
      mobile: '9876543212',
      passwordHash: defaultPasswordHash,
      fullName: 'Apex Test Centre Manager',
      designation: 'Technical Director',
      district: 'North Delhi',
      state: 'Delhi',
      isEmailVerified: true,
      isMobileVerified: true,
      roles: { create: [{ roleId: roleGATC.id }] },
    },
  });

  // Business Applicant User
  const applicantUser = await prisma.user.upsert({
    where: { email: 'applicant.business@example.com' },
    update: {},
    create: {
      email: 'applicant.business@example.com',
      mobile: '9876543213',
      passwordHash: defaultPasswordHash,
      fullName: 'Suresh Sharma',
      designation: 'Proprietor',
      district: 'North Delhi',
      state: 'Delhi',
      isEmailVerified: true,
      isMobileVerified: true,
      roles: { create: [{ roleId: roleApplicant.id }] },
    },
  });

  // 4. Seed Organizations
  console.log('🏢 Seeding Organizations...');
  const deptOrg = await prisma.organization.upsert({
    where: { code: 'DEPT-DEL-NORTH' },
    update: {},
    create: {
      name: 'Department of Legal Metrology, North Delhi Zone',
      code: 'DEPT-DEL-NORTH',
      type: OrganizationType.DEPARTMENT,
      address: 'Vikas Bhawan, Civil Lines',
      district: 'North Delhi',
      state: 'Delhi',
      pincode: '110054',
      contactEmail: 'contact.north@legalmetrology.gov.in',
      contactPhone: '011-23810001',
    },
  });

  const gatcOrg = await prisma.organization.upsert({
    where: { code: 'GATC-APEX-001' },
    update: {},
    create: {
      name: 'Apex Standards & Testing Centre (GATC)',
      code: 'GATC-APEX-001',
      type: OrganizationType.GATC,
      registrationNo: 'GATC/DEL/2025/089',
      gstin: '07AAAAA0000A1Z5',
      address: 'Plot 45, GT Karnal Industrial Area',
      district: 'North Delhi',
      state: 'Delhi',
      pincode: '110033',
      contactEmail: 'info@apextesting.org.in',
      contactPhone: '011-27456789',
      members: { create: [{ userId: gatcUser.id, roleInOrg: 'DIRECTOR' }] },
    },
  });

  const applicantOrg = await prisma.organization.upsert({
    where: { code: 'BIZ-SHARMA-TRADERS' },
    update: {},
    create: {
      name: 'Sharma Retail Traders Pvt Ltd',
      code: 'BIZ-SHARMA-TRADERS',
      type: OrganizationType.BUSINESS_APPLICANT,
      registrationNo: 'REG/ND/2023/1142',
      gstin: '07BBBBA1111B1Z2',
      address: 'Shop 12, Chandni Chowk Market',
      district: 'North Delhi',
      state: 'Delhi',
      pincode: '110006',
      contactEmail: 'applicant.business@example.com',
      contactPhone: '9876543213',
      members: { create: [{ userId: applicantUser.id, roleInOrg: 'PROPRIETOR' }] },
    },
  });

  // 5. Seed Instrument Types & Test Definitions
  console.log('⚖️ Seeding Instrument Types & Test Definitions...');
  
  // Instrument Type 1: Commercial Scale (Class III)
  const instTypeScale = await prisma.instrumentType.upsert({
    where: { code: 'WEIGHING_SCALE_CLASS_III' },
    update: {},
    create: {
      code: 'WEIGHING_SCALE_CLASS_III',
      name: 'Non-Automatic Weighing Scale (Class III)',
      category: 'Weighing Instruments',
      accuracyClass: 'Class III',
      verificationPeriodMonths: 12,
      description: 'Commercial counter scale up to 30 kg capacity used in retail trade',
      testDefinitions: {
        create: [
          {
            testCode: 'REPEATABILITY_TEST',
            testName: 'Repeatability Test at 50% Capacity',
            parameterName: 'Observed Error (15 kg)',
            unit: 'g',
            toleranceMin: -1.5,
            toleranceMax: 1.5,
            isRequired: true,
            displayOrder: 1,
          },
          {
            testCode: 'ECCENTRICITY_TEST',
            testName: 'Eccentric Load Test (Corner Loading)',
            parameterName: 'Corner Error (10 kg)',
            unit: 'g',
            toleranceMin: -1.0,
            toleranceMax: 1.0,
            isRequired: true,
            displayOrder: 2,
          },
          {
            testCode: 'MAX_PERMISSIBLE_ERROR',
            testName: 'Max Permissible Error at Full Capacity (30 kg)',
            parameterName: 'Observed Error (30 kg)',
            unit: 'g',
            toleranceMin: -3.0,
            toleranceMax: 3.0,
            isRequired: true,
            displayOrder: 3,
          },
        ],
      },
    },
  });

  // Instrument Type 2: Fuel Dispenser
  const instTypeFuel = await prisma.instrumentType.upsert({
    where: { code: 'FUEL_DISPENSER_CLASS_0_5' },
    update: {},
    create: {
      code: 'FUEL_DISPENSER_CLASS_0_5',
      name: 'Petrol / Diesel Dispensing Pump',
      category: 'Flow Measuring Instruments',
      accuracyClass: 'Class 0.5',
      verificationPeriodMonths: 12,
      description: 'Retail petroleum dispensing unit flow meter system',
      testDefinitions: {
        create: [
          {
            testCode: 'DELIVERY_ERROR_5L',
            testName: 'Volumetric Delivery Accuracy at 5 Litres',
            parameterName: 'Volume Error (5 L measure)',
            unit: 'mL',
            toleranceMin: -25.0,
            toleranceMax: 25.0,
            isRequired: true,
            displayOrder: 1,
          },
          {
            testCode: 'DELIVERY_ERROR_20L',
            testName: 'Volumetric Delivery Accuracy at 20 Litres',
            parameterName: 'Volume Error (20 L measure)',
            unit: 'mL',
            toleranceMin: -100.0,
            toleranceMax: 100.0,
            isRequired: true,
            displayOrder: 2,
          },
        ],
      },
    },
  });

  // 6. Seed Demo Instruments
  console.log('📏 Seeding Demo Instruments...');
  const demoInstrument = await prisma.instrument.upsert({
    where: {
      serialNumber_manufacturer: {
        serialNumber: 'SN-SCALE-2025-9981',
        manufacturer: 'Avery Weigh-Tronix India',
      },
    },
    update: {},
    create: {
      typeId: instTypeScale.id,
      ownerId: applicantUser.id,
      manufacturer: 'Avery Weigh-Tronix India',
      model: 'E1030-DIGITAL',
      serialNumber: 'SN-SCALE-2025-9981',
      capacity: '30 kg',
      accuracyClass: 'Class III',
      unit: 'kg',
      installationLocation: 'Shop 12 Counter 1, Chandni Chowk',
      district: 'North Delhi',
      state: 'Delhi',
      purchaseDate: new Date('2024-05-10'),
      currentStatus: 'REGISTERED',
      nextVerificationDue: new Date('2026-10-01'),
    },
  });

  // 7. Seed Demo Verification Application
  console.log('📝 Seeding Demo Verification Application...');
  const demoApplication = await prisma.application.upsert({
    where: { applicationNo: 'APP-2026-DEL-0001' },
    update: {},
    create: {
      applicationNo: 'APP-2026-DEL-0001',
      applicantId: applicantUser.id,
      instrumentId: demoInstrument.id,
      type: ApplicationType.NEW_VERIFICATION,
      status: ApplicationStatus.SCHEDULED,
      submissionDate: new Date('2026-09-01'),
      reviewDate: new Date('2026-09-02'),
      reviewerId: adminUser.id,
      district: 'North Delhi',
      statusHistory: {
        create: [
          { toStatus: ApplicationStatus.DRAFT, remarks: 'Application draft initialized by applicant' },
          { fromStatus: ApplicationStatus.DRAFT, toStatus: ApplicationStatus.SUBMITTED, remarks: 'Submitted with required documents' },
          { fromStatus: ApplicationStatus.SUBMITTED, toStatus: ApplicationStatus.APPROVED_FOR_SCHEDULING, remarks: 'Reviewed and approved by Admin' },
          { fromStatus: ApplicationStatus.APPROVED_FOR_SCHEDULING, toStatus: ApplicationStatus.SCHEDULED, remarks: 'Verification visit scheduled with LMO' },
        ],
      },
      assignments: {
        create: {
          assignedById: adminUser.id,
          assignedToId: lmoUser.id,
          remarks: 'Assigned to LMO Rajesh Kumar for North Delhi zone verification',
        },
      },
      schedule: {
        create: {
          scheduledDate: new Date('2026-09-25'),
          scheduledTime: '11:00 AM',
          location: 'Shop 12 Counter 1, Chandni Chowk',
          district: 'North Delhi',
        },
      },
    },
  });

  console.log('✅ Legal Metrology Database Seeding Complete!');
  console.log('----------------------------------------------------');
  console.log('Demo Credentials Summary:');
  console.log('1. Admin: admin@legalmetrology.gov.in / Password@123');
  console.log('2. LMO Officer: lmo.delhi@legalmetrology.gov.in / Password@123');
  console.log('3. GATC Centre: gatc.north@testing.org.in / Password@123');
  console.log('4. Applicant: applicant.business@example.com / Password@123');
  console.log('----------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('💥 Database seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
