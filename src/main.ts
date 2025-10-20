import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod ,ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activare ValidationPipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimină câmpurile care nu sunt definite în DTO
      forbidNonWhitelisted: true, // aruncă eroare dacă există câmpuri suplimentare
      transform: true, // transformă automat tipurile (ex: string -> number)
    }),
  );
  // Prefix global pentru public
  app.setGlobalPrefix('public', {
    exclude: [
      {
        path: 'admin/(.*)',
        method: RequestMethod.ALL, 
      },
    ],
  });

  await app.listen(3000);
  console.log('🚀 Aplicația rulează pe http://localhost:3000');
  console.log('🌍 Public endpoints: http://localhost:3000/public');
  console.log('🔑 Admin endpoints: http://localhost:3000/admin');
}
bootstrap();
