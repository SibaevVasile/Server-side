import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix global pentru public
  app.setGlobalPrefix('public', {
    exclude: [
      {
        path: 'admin/(.*)',
        method: RequestMethod.ALL, // în loc de undefined
      },
    ],
  });

  await app.listen(3000);
  console.log('🚀 Aplicația rulează pe http://localhost:3000');
  console.log('🌍 Public endpoints: http://localhost:3000/public');
  console.log('🔑 Admin endpoints: http://localhost:3000/admin');
}
bootstrap();
