import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import next from 'next';
import path from 'node:path';

const frontendRoot = process.cwd();

// Load the unified project configuration before importing server modules that validate it.
dotenv.config({ path: path.join(frontendRoot, '.env.local') });
dotenv.config({ path: path.join(frontendRoot, '.env') });
process.env.PORT = process.env.FRONTEND_PORT || '3000';
process.env.UPLOAD_DIR = path.resolve(frontendRoot, process.env.UPLOAD_DIR || './uploads');

const development = process.env.NODE_ENV !== 'production' && !process.argv.includes('--production');
const port = Number(process.env.PORT);
const nextApp = next({ dev: development, dir: frontendRoot });
const nextHandler = nextApp.getRequestHandler();

const isApiRequest = (request: Request): boolean => {
  if (
    request.path === '/api/auth' ||
    request.path.startsWith('/api/auth/') ||
    request.path === '/api/health'
  ) {
    return false;
  }

  return (
    request.path === '/health' ||
    request.path === '/ready' ||
    request.path === '/uploads' ||
    request.path.startsWith('/uploads/') ||
    request.path === '/api' ||
    request.path.startsWith('/api/')
  );
};

const start = async (): Promise<void> => {
  await nextApp.prepare();

  const server = express();
  const apiApp = (await import('./src/server/app')).default;

  server.use((request: Request, response: Response, nextMiddleware: NextFunction) => {
    if (isApiRequest(request)) {
      return apiApp(request, response, nextMiddleware);
    }
    return nextMiddleware();
  });

  server.all('*', (request: Request, response: Response) => nextHandler(request, response));

  server.listen(port, () => {
    console.log(`Metrify unified app running at http://localhost:${port}`);
    console.log(`API: http://localhost:${port}/api`);
  });
};

start().catch((error: unknown) => {
  console.error('Failed to start unified Next.js app:', error);
  process.exit(1);
});
