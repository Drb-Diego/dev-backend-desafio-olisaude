import { NestFactory } from '@nestjs/core';
import { AppModule } from './entities/App/app.module';

async function bootstrap() {
  const { PORT } = process.env;

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
