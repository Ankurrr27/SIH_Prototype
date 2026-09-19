import { Router } from 'express';
import { VerificationController } from './verification.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { SystemRole } from '@prisma/client';
import {
  createInspectionSchema,
  recordTestResultSchema,
  reviewInspectionSchema,
  listInspectionsQuerySchema,
} from './verification.schemas';

const router = Router();
const controller = new VerificationController();

router.use(authenticateJWT);

router.get('/inspections', validateRequest({ query: listInspectionsQuerySchema }), controller.listInspections);
router.post(
  '/inspections',
  requireRoles(SystemRole.LMO, SystemRole.ADMIN, SystemRole.GATC),
  validateRequest({ body: createInspectionSchema }),
  controller.createInspection
);
router.get('/inspections/:id', controller.getInspectionById);
router.post('/inspections/:id/start', requireRoles(SystemRole.LMO, SystemRole.GATC, SystemRole.ADMIN), controller.startInspection);

router.post(
  '/inspections/:id/tests',
  requireRoles(SystemRole.LMO, SystemRole.GATC, SystemRole.ADMIN),
  validateRequest({ body: recordTestResultSchema }),
  controller.recordTestResult
);

router.post('/inspections/:id/submit', requireRoles(SystemRole.LMO, SystemRole.GATC, SystemRole.ADMIN), controller.submitInspection);
router.post(
  '/inspections/:id/approve',
  requireRoles(SystemRole.ADMIN, SystemRole.LMO),
  validateRequest({ body: reviewInspectionSchema }),
  controller.approveInspection
);

export default router;
