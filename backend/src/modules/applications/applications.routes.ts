import { Router } from 'express';
import { ApplicationsController } from './applications.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { SystemRole } from '@prisma/client';
import {
  createApplicationSchema,
  updateApplicationSchema,
  requestCorrectionSchema,
  rejectApplicationSchema,
  listApplicationsQuerySchema,
} from './applications.schemas';

const router = Router();
const controller = new ApplicationsController();

router.use(authenticateJWT);

router.post('/', validateRequest({ body: createApplicationSchema }), controller.createApplication);
router.get('/', validateRequest({ query: listApplicationsQuerySchema }), controller.listApplications);
router.get('/:id', controller.getApplicationById);
router.get('/:id/history', controller.getApplicationHistory);

// Status transition actions
router.post('/:id/submit', controller.submitApplication);
router.post('/:id/review', requireRoles(SystemRole.LMO, SystemRole.ADMIN), controller.reviewApplication);
router.post(
  '/:id/request-correction',
  requireRoles(SystemRole.LMO, SystemRole.ADMIN),
  validateRequest({ body: requestCorrectionSchema }),
  controller.requestCorrection
);
router.post('/:id/approve', requireRoles(SystemRole.LMO, SystemRole.ADMIN), controller.approveForScheduling);
router.post(
  '/:id/reject',
  requireRoles(SystemRole.LMO, SystemRole.ADMIN),
  validateRequest({ body: rejectApplicationSchema }),
  controller.rejectApplication
);
router.post('/:id/cancel', controller.cancelApplication);

export default router;
