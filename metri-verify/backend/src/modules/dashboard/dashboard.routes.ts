import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { SystemRole } from '@prisma/client';

const router = Router();
const controller = new DashboardController();

router.use(authenticateJWT);

router.get('/applicant', requireRoles(SystemRole.APPLICANT, SystemRole.ADMIN), controller.getApplicantDashboard);
router.get('/lmo', requireRoles(SystemRole.LMO, SystemRole.ADMIN), controller.getLMODashboard);
router.get('/gatc', requireRoles(SystemRole.GATC, SystemRole.ADMIN), controller.getGATCDashboard);
router.get('/admin', requireRoles(SystemRole.ADMIN), controller.getAdminDashboard);

export default router;
