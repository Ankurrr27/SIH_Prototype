import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { authenticateJWT } from '../../middleware/auth.middleware';
import { authRateLimiter } from '../../middleware/rate-limit.middleware';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  verifyEmailSchema,
} from './auth.schemas';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', authRateLimiter, validateRequest({ body: registerSchema }), authController.register);
router.post('/login', authRateLimiter, validateRequest({ body: loginSchema }), authController.login);
router.post('/refresh', validateRequest({ body: refreshTokenSchema }), authController.refresh);
router.post('/logout', authController.logout);
router.post('/forgot-password', authRateLimiter, validateRequest({ body: forgotPasswordSchema }), authController.forgotPassword);
router.post('/reset-password', validateRequest({ body: resetPasswordSchema }), authController.resetPassword);
router.post('/verify-email', validateRequest({ body: verifyEmailSchema }), authController.verifyEmail);

// Protected routes
router.get('/me', authenticateJWT, authController.getMe);
router.patch('/change-password', authenticateJWT, validateRequest({ body: changePasswordSchema }), authController.changePassword);

export default router;
