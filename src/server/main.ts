import { NestFactory } from '@nestjs/core';
import { PORT } from 'src/shared/constants/env';
import { AppModule } from './modules/app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule.initialize());
  await app.listen(PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
