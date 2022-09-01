// ./src/server/app.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UsersModule } from './users.module';
import { TokensModule } from './tokens.module';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
} from '../../shared/constants/env';
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

    const dbModule = TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
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
