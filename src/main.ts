import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use pipes globally
  app.useGlobalPipes(new ValidationPipe()); // you can pass multiple pipe here
  // install 
  // ->> npm i --save class-validator class-transformer

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
