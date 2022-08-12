// ./src/server/app.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { NODE_ENV, PORT } from "../../shared/constants/env";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UsersModule } from './users.module';
import * as fs from 'fs';

declare const module: any;

@Module({})
export class AppModule {
  public static initialize(): DynamicModule {
    // use already instantiated Next app or create one
    const nextOptions = {
      httpsOptions: {
        key: fs.readFileSync(process.env.HOME + process.env.SSL_KEY_PATH || ''),
        cert: fs.readFileSync(
          process.env.HOME + process.env.SSL_CERT_PATH || '',
        ),
      },
      isNextDevCommand: true,
      port: Number(PORT),
      dev: NODE_ENV === 'development',
      crossOrigin: 'anonymous',
    };

    const renderModule =
      module.hot?.data?.renderModule ??
      RenderModule.forRootAsync(Next(nextOptions), { viewsDir: null });

    if (module.hot) {
      /* add a handler to cache RenderModule
        before disposing existing module */
      module.hot.dispose((data: any) => {
        data.renderModule = renderModule;
      });
    }
    // Todo: env configuration
    const dbModule = TypeOrmModule.forRoot({
      type: 'mysql',
      // TODO: env configuration here for host
      // For docker I use the container name 'forestoken_mysql_1'
      // For local development host is 'localhost'
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      // locally i didn't need a password as root
      //password: 'root',
      database: 'test',
      entities: [User],
      // to auto create schema, avoid in prod?
      synchronize: true,
      autoLoadEntities: true,
    });
    return {
      module: AppModule,
      imports: [renderModule, dbModule, UsersModule],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
