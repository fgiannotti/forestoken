import { NestFactory } from '@nestjs/core';
import { PORT } from 'src/shared/constants/env';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
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

  const config = new DocumentBuilder()
    .setTitle('Forestoken')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('criptopinos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
