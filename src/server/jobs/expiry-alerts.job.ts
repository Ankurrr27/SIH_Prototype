import { Queue, Worker } from 'bullmq';
import { redis } from '../config/redis';
import { prisma } from '../config/database';
import { CertificateStatus, NotificationType } from '@prisma/client';

export const EXPIRY_QUEUE_NAME = 'certificate-expiry-alerts';

export const expiryQueue = new Queue(EXPIRY_QUEUE_NAME, {
  connection: redis as any,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
  },
});

export const processExpiryAlerts = async () => {
  console.log('⏰ Running Certificate Expiry Alert Job...');

  const now = new Date();
  const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  // 1. Find certificates expiring within 30 days
  const expiringCerts = await prisma.certificate.findMany({
    where: {
      status: CertificateStatus.VALID,
      validUntil: { lte: thirtyDaysFromNow, gte: now },
    },
    include: {
      instrument: { include: { owner: true } },
    },
  });

  console.log(`🔍 Found ${expiringCerts.length} certificates nearing expiration.`);

  for (const cert of expiringCerts) {
    const ownerId = cert.instrument.ownerId;
    const daysLeft = Math.ceil(
      (cert.validUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Create notification if not already alerted today
    await prisma.notification.create({
      data: {
        userId: ownerId,
        type: NotificationType.CERTIFICATE_EXPIRING,
        title: 'Certificate Nearing Expiry Alert',
        message: `Certificate #${cert.certificateNo} for ${cert.instrument.manufacturer} (${cert.instrument.model}) will expire in ${daysLeft} days on ${cert.validUntil.toISOString().split('T')[0]}. Please apply for re-verification.`,
        link: `/certificates/${cert.id}`,
      },
    });
  }

  // 2. Mark past certificates as EXPIRED
  const expiredCount = await prisma.certificate.updateMany({
    where: {
      status: CertificateStatus.VALID,
      validUntil: { lt: now },
    },
    data: { status: CertificateStatus.EXPIRED },
  });

  if (expiredCount.count > 0) {
    console.log(`📌 Updated ${expiredCount.count} certificates to EXPIRED status.`);
  }

  return { expiringCount: expiringCerts.length, expiredUpdated: expiredCount.count };
};

// BullMQ Worker
export const expiryWorker = new Worker(
  EXPIRY_QUEUE_NAME,
  async (job) => {
    return processExpiryAlerts();
  },
  { connection: redis as any }
);

expiryWorker.on('completed', (job) => {
  console.log(`✅ Expiry Alert Job [${job.id}] completed successfully.`);
});

expiryWorker.on('failed', (job, err) => {
  console.error(`💥 Expiry Alert Job [${job?.id}] failed:`, err.message);
});
