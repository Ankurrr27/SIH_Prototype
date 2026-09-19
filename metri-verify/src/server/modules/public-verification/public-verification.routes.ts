import { Router } from 'express';
import { CertificatesController } from '../certificates/certificates.controller';

const router = Router();
const controller = new CertificatesController();

// Unauthenticated Public Routes
router.get('/certificates/verify/:token', controller.verifyByToken);
router.get('/certificates/:certificateNo', controller.verifyByCertificateNo);

export default router;
