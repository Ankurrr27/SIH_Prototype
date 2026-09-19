import { Router } from 'express';
import { DocumentsController } from './documents.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { uploadSingle } from '../../middleware/upload.middleware';

const router = Router();
const controller = new DocumentsController();

router.use(authenticateJWT);

router.post('/upload', uploadSingle('file'), controller.uploadDocument);
router.get('/:id', controller.getDocumentById);
router.delete('/:id', controller.deleteDocument);

export default router;
