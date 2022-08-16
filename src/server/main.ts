import { NestFactory } from '@nestjs/core';
import { PORT } from 'src/shared/constants/env';
import { AppModule } from './modules/app.module';
import { DefaultErrorFilter } from './controllers/default-error.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule.initialize());
  app.useGlobalFilters(new DefaultErrorFilter());
  await app.listen(PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
