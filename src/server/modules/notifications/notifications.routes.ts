import { Router } from 'express';
import { NotificationsController } from './notifications.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';

const router = Router();
const controller = new NotificationsController();

router.use(authenticateJWT);

router.get('/', controller.getUserNotifications);
router.patch('/:id/read', controller.markAsRead);
router.post('/mark-all-read', controller.markAllAsRead);

export default router;
