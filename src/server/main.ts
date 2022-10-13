import { NestFactory } from '@nestjs/core';
import { PORT } from 'src/shared/constants/env';
import { AppModule } from './modules/app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import fetch from 'node-fetch';
import { abortableFetch } from 'abortcontroller-polyfill/dist/cjs-ponyfill';
// To fix: https://github.com/node-fetch/node-fetch/issues/784
// useful: https://www.npmjs.com/package/node-abort-controller, but I used this: https://lightrun.com/answers/apollographql-apollo-client-expected-signal-to-be-an-instanceof-abortsignal
global.fetch = abortableFetch(fetch).fetch;

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule.initialize(), {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        let errs = '';
        validationErrors.forEach((err) => {
          errs += JSON.stringify(err.constraints);
        });
        console.log('errores juntitos', errs);
        return new BadRequestException(errs);
      },
    }),
  );

  await app.listen(PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
