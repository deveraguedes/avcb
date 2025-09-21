import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS para todos os origins temporariamente
  app.enableCors({
    origin: true, // Permite todas as origens
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  // Global prefix para API
  app.setGlobalPrefix('api');
  
  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}

bootstrap();
