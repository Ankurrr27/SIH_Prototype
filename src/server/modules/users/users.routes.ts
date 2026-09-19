import { Router } from 'express';
import { UsersController } from './users.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { SystemRole } from '@prisma/client';
import {
  updateProfileSchema,
  updateUserStatusSchema,
  listUsersQuerySchema,
} from './users.schemas';

const router = Router();
const controller = new UsersController();

router.use(authenticateJWT);

// Self profile
router.get('/me', controller.getMe);
router.patch('/me', validateRequest({ body: updateProfileSchema }), controller.updateMe);

// Admin-only management
router.get('/', requireRoles(SystemRole.ADMIN), validateRequest({ query: listUsersQuerySchema }), controller.listUsers);
router.get('/:id', requireRoles(SystemRole.ADMIN), controller.getUserById);
router.patch('/:id/status', requireRoles(SystemRole.ADMIN), validateRequest({ body: updateUserStatusSchema }), controller.updateUserStatus);

export default router;
