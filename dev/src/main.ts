import { NestFactory } from '@nestjs/core';
import { AppModule } from './entities/App/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const { PORT } = process.env;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
