import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [`${process.env.CLIENT_URL}`],
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
