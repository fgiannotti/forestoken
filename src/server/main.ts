import {NestFactory} from '@nestjs/core';
import {PORT} from 'src/shared/constants/env';
import {AppModule} from './modules/app.module';
import session from 'express-session';
import passport from 'passport';
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

    app.use(
        session({
            secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
            saveUninitialized: false,
            resave: false,
            cookie: {},
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
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
