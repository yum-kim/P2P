import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import * as config from 'config';
import { readFileSync } from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = serverConfig.port;
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://dqe25jv8g5qos.cloudfront.net', 'http://localhost:3000'],
    credentials: true,
  });
  setupSwagger(app);
  await app.listen(port);
  try {
    const banner: string = readFileSync('./.banner', 'utf8');
    console.log(banner);
  } catch (e) {}
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
