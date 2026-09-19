import { Router } from 'express';
import { OrganizationsController } from './organizations.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { SystemRole } from '@prisma/client';
import {
  createOrganizationSchema,
  updateOrganizationSchema,
  addMemberSchema,
  listOrganizationsQuerySchema,
} from './organizations.schemas';

const router = Router();
const controller = new OrganizationsController();

router.use(authenticateJWT);

router.post('/', validateRequest({ body: createOrganizationSchema }), controller.createOrganization);
router.get('/', validateRequest({ query: listOrganizationsQuerySchema }), controller.listOrganizations);
router.get('/:id', controller.getOrganizationById);
router.patch('/:id', validateRequest({ body: updateOrganizationSchema }), controller.updateOrganization);

router.post('/:id/members', validateRequest({ body: addMemberSchema }), controller.addMember);
router.delete('/:id/members/:userId', controller.removeMember);

export default router;
