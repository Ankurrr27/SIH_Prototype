import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { prisma } from '../config/database';
import { redis } from '../config/redis';
import authRouter from '../modules/auth/auth.routes';
import usersRouter from '../modules/users/users.routes';
import organizationsRouter from '../modules/organizations/organizations.routes';
import instrumentsRouter from '../modules/instruments/instruments.routes';
import applicationsRouter from '../modules/applications/applications.routes';
import schedulingRouter from '../modules/scheduling/scheduling.routes';
import verificationRouter from '../modules/verification/verification.routes';
import documentsRouter from '../modules/documents/documents.routes';
import certificatesRouter from '../modules/certificates/certificates.routes';
import publicVerificationRouter from '../modules/public-verification/public-verification.routes';
import notificationsRouter from '../modules/notifications/notifications.routes';
import dashboardRouter from '../modules/dashboard/dashboard.routes';
import mobileSyncRouter from '../modules/mobile-sync/mobile-sync.routes';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);
router.use('/api/organizations', organizationsRouter);
router.use('/api/instruments', instrumentsRouter);
router.use('/api/applications', applicationsRouter);
router.use('/api/scheduling', schedulingRouter);
router.use('/api/verification', verificationRouter);
router.use('/api/documents', documentsRouter);
router.use('/api/certificates', certificatesRouter);
router.use('/api/public', publicVerificationRouter);
router.use('/api/notifications', notificationsRouter);
router.use('/api/dashboard', dashboardRouter);
router.use('/api/mobile', mobileSyncRouter);

// Liveness check
router.get('/health', (req: Request, res: Response) => {
  return sendSuccess(res, 'Legal Metrology Backend API is live and healthy', {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Readiness check (checks database and redis connectivity)
router.get('/ready', async (req: Request, res: Response) => {
  let dbStatus = 'DOWN';
  let redisStatus = 'DOWN';

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'UP';
  } catch (err: any) {
    dbStatus = `DOWN (${err.message})`;
  }

  try {
    const ping = await redis.ping();
    if (ping === 'PONG') redisStatus = 'UP';
  } catch (err: any) {
    redisStatus = `DOWN (${err.message})`;
  }

  const isReady = dbStatus === 'UP';

  return res.status(isReady ? 200 : 503).json({
    success: isReady,
    message: isReady ? 'System is ready to handle requests' : 'System degraded or unavailable',
    services: {
      database: dbStatus,
      redis: redisStatus,
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
