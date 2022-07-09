// ./src/server/app.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NODE_ENV } from '../shared/constants/env';
@Module({})
export class AppModule {
  public static initialize(): DynamicModule {
    const renderModule = RenderModule.forRootAsync(
      Next({ dev: NODE_ENV === 'development' }),
      {
        viewsDir: null,
      },
    );

    return {
      module: AppModule,
      imports: [renderModule],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
