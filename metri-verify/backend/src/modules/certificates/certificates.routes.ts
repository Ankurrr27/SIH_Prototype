import { Router } from 'express';
import { CertificatesController } from './certificates.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/role.middleware';
import { SystemRole } from '@prisma/client';

const router = Router();
const controller = new CertificatesController();

router.use(authenticateJWT);

router.get('/', controller.listCertificates);
router.post('/issue', requireRoles(SystemRole.LMO, SystemRole.ADMIN), controller.issueCertificate);
router.get('/:id', controller.getCertificateById);
router.get('/:id/download', controller.downloadCertificate);
router.post('/:id/revoke', requireRoles(SystemRole.ADMIN), controller.revokeCertificate);

export default router;
