import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { env } from './config/env';
import { globalRateLimiter } from './middleware/rate-limit.middleware';
import { errorHandler } from './middleware/error.middleware';
import mainRouter from './routes/index';

const app: Express = express();

// Security headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: '*', // Prototype setting; customize in production
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

// Global rate limiting
app.use('/api', globalRateLimiter);

// Static uploads serving
app.use('/uploads', express.static(path.resolve(process.cwd(), env.UPLOAD_DIR)));

// Mount API routes
app.use('/', mainRouter);

// Fallback 404 route handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Centralized error handler
app.use(errorHandler);

export default app;
