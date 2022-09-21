import { NestFactory } from '@nestjs/core';
import { PORT } from 'src/shared/constants/env';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule.initialize(), {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
    transform: true,
  }));

  await app.listen(PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
