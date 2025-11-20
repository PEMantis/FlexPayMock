import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false,
  });

  await app.listen(3000, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log('API listening on :3000');
}

bootstrap();
