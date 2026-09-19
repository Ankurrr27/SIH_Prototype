import { Router } from 'express';
import { MobileSyncController } from './mobile-sync.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { SystemRole } from '@prisma/client';
import { batchSyncPayloadSchema } from './mobile-sync.schemas';

const router = Router();
const controller = new MobileSyncController();

router.use(authenticateJWT);

router.get('/tasks', requireRoles(SystemRole.LMO, SystemRole.ADMIN, SystemRole.GATC), controller.getFieldOfficerTasks);
router.post('/sync', requireRoles(SystemRole.LMO, SystemRole.ADMIN, SystemRole.GATC), validateRequest({ body: batchSyncPayloadSchema }), controller.syncOfflineData);

export default router;
