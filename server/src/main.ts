import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { setupApp } from './setup.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = setupApp(app);
  const port = config.get('PORT', { infer: true });
  await app.listen(port);
  Logger.log(
    `API em http://localhost:${port}/api · docs em /api/docs`,
    'Bootstrap',
  );
}
await bootstrap();
