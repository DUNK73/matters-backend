import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

let app: any;

async function createApp() {
  if (!app) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    app = await NestFactory.create(AppModule, adapter);
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
    await app.init();
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const nestApp = await createApp();
  const expressApp = nestApp.getHttpAdapter().getInstance();
  return expressApp(req, res);
}
