import { Router } from 'express';
import { SchedulingController } from './scheduling.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { SystemRole } from '@prisma/client';
import {
  createScheduleSchema,
  rescheduleSchema,
  createAssignmentSchema,
  listSchedulesQuerySchema,
  listAssignmentsQuerySchema,
} from './scheduling.schemas';

const router = Router();
const controller = new SchedulingController();

router.use(authenticateJWT);

// Schedules
router.get('/schedules', validateRequest({ query: listSchedulesQuerySchema }), controller.listSchedules);
router.post(
  '/schedules',
  requireRoles(SystemRole.LMO, SystemRole.ADMIN),
  validateRequest({ body: createScheduleSchema }),
  controller.createSchedule
);
router.post(
  '/schedules/:id/reschedule',
  validateRequest({ body: rescheduleSchema }),
  controller.reschedule
);
router.post('/schedules/:id/cancel', controller.cancelSchedule);

// Assignments
router.get('/assignments', validateRequest({ query: listAssignmentsQuerySchema }), controller.listAssignments);
router.post(
  '/assignments',
  requireRoles(SystemRole.ADMIN, SystemRole.LMO),
  validateRequest({ body: createAssignmentSchema }),
  controller.createAssignment
);

// Availability Reports
router.get('/officers/availability', requireRoles(SystemRole.ADMIN, SystemRole.LMO), controller.getOfficerAvailability);
router.get('/gatcs/availability', requireRoles(SystemRole.ADMIN, SystemRole.LMO), controller.getGATCAvailability);

export default router;
