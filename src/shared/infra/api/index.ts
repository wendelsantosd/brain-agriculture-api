import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import { server } from 'src/shared/config/env/server';
import { AppModule } from './app.module';

export async function bootstrapAPI() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(json({ limit: '20mb' }));

  await app.listen(server.port ?? '3333');
}
