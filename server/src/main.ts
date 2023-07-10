import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import * as config from 'config';
import { readFileSync } from 'fs';
import { SocketIoAdapter } from './adapters/socket-io.adapters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = serverConfig.port;
  app.enableCors();
  setupSwagger(app);
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  await app.listen(port);
  try {
    const banner: string = readFileSync('./.banner', 'utf8');
    console.log(banner);
  } catch (e) {}
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
