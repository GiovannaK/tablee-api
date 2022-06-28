import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rawBodyMiddleware from './middlewares/rawBody.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(rawBodyMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
