// ./src/server/app.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { NODE_ENV } from '../../shared/constants/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UsersModule } from './users.module';
import { TokensModule } from "./tokens.module";

declare const module: any;

@Module({})
export class AppModule {
  public static initialize(): DynamicModule {

    // use already instantiated Next app or create one
    const renderModule =
      module.hot?.data?.renderModule ??
      RenderModule.forRootAsync(
        Next({
          dev: NODE_ENV === 'development',
          hostname: 'localhost',
          port: 3000,
        }),
        {
          viewsDir: null,
        },
      );

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
      //host: 'forestoken_mysql_1',
      port: 3306,
      username: 'test',
      // locally i didn't need a password as root
      password: 'test',
      database: 'test',
      entities: [User],
      // to auto create schema, avoid in prod?
      synchronize: true,
      autoLoadEntities: true,
    });
    return {
      module: AppModule,
      imports: [renderModule, dbModule, UsersModule, TokensModule],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
