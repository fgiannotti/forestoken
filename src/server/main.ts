import { NestFactory } from '@nestjs/core';
import { PORT } from 'src/shared/constants/env';
import { AppModule } from './modules/app.module';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

declare const module: any;

require('dotenv').config();

async function bootstrap() {
  const ssl = process.env.SSL === 'true';
  let httpsOptions = null;
  if (ssl) {
    const keyPath = process.env.HOME + process.env.SSL_KEY_PATH || '';
    const certPath = process.env.HOME + process.env.SSL_CERT_PATH || '';
    httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  }
  const app = await NestFactory.create(AppModule.initialize(), {
    httpsOptions,
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const hostname = process.env.HOSTNAME || 'localhost';
  await app.listen(PORT, hostname, () => {
    const address =
      'http' + (ssl ? 's' : '') + '://' + hostname + ':' + PORT + '/';
    Logger.log('Listening at ' + address);
  });
}

bootstrap();
