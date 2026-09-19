import { Router } from 'express';
import { InstrumentsController } from './instruments.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { SystemRole } from '@prisma/client';
import {
  createInstrumentSchema,
  updateInstrumentSchema,
  createInstrumentTypeSchema,
  updateInstrumentTypeSchema,
  listInstrumentsQuerySchema,
} from './instruments.schemas';

const router = Router();
const controller = new InstrumentsController();

router.use(authenticateJWT);

// Instrument Types Endpoints
router.get('/types', controller.listInstrumentTypes);
router.post(
  '/types',
  requireRoles(SystemRole.ADMIN),
  validateRequest({ body: createInstrumentTypeSchema }),
  controller.createInstrumentType
);
router.patch(
  '/types/:id',
  requireRoles(SystemRole.ADMIN),
  validateRequest({ body: updateInstrumentTypeSchema }),
  controller.updateInstrumentType
);

// Instruments Endpoints
router.post('/', validateRequest({ body: createInstrumentSchema }), controller.createInstrument);
router.get('/', validateRequest({ query: listInstrumentsQuerySchema }), controller.listInstruments);
router.get('/:id', controller.getInstrumentById);
router.patch('/:id', validateRequest({ body: updateInstrumentSchema }), controller.updateInstrument);
router.delete('/:id', controller.deleteInstrument);

export default router;
