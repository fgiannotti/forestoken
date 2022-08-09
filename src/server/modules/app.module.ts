// ./src/server/app.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { NODE_ENV } from '../../shared/constants/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from "../services/users.service";
import { UsersModule } from "./users.module";

declare const module: any;

@Module({})
export class AppModule {
  public static initialize(): DynamicModule {
    /* during initialization attempt pulling cached RenderModule
      from persisted data */
    const renderModule =
      module.hot?.data?.renderModule ??
      RenderModule.forRootAsync(Next({ dev: NODE_ENV === 'development' }), {
        viewsDir: null,
      });

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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User],
      // to auto create schema, avoid in prod
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
