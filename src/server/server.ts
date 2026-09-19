import app from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import { initStorage } from './config/storage';

const startServer = async () => {
  console.log('🚀 Starting MetriVerify application...');

  // Initialize local storage directories
  initStorage();

  // Connect Database
  await connectDatabase();

  // Connect Redis
  await connectRedis();

  const server = app.listen(env.PORT, () => {
    console.log(`🌐 Server running in [${env.NODE_ENV}] mode on port ${env.PORT}`);
    console.log(`🔗 Health Check: http://localhost:${env.PORT}/health`);
    console.log(`🔗 Ready Check: http://localhost:${env.PORT}/ready`);
  });

  const gracefulShutdown = async (signal: string) => {
    console.log(`\n⚠️ Received ${signal}. Starting graceful shutdown...`);
    server.close(async () => {
      console.log('🚪 HTTP server closed.');
      await disconnectDatabase();
      process.exit(0);
    });

    // Force shutdown after 10 seconds if graceful shutdown fails
    setTimeout(() => {
      console.error('💥 Forced shutdown due to timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
};

startServer().catch((error) => {
  console.error('💥 Fatal error starting server:', error);
  process.exit(1);
});
