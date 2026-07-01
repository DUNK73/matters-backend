import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // Если нужно передавать куки/авторизацию
  });

  // Используем middleware cors напрямую
  app.use(cors({
    origin: '*',
    credentials: true,
  }));

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
