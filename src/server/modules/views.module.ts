import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewsController } from '../controllers/views/views.controller';
import { TokensService } from '../services/tokens.service';
import { MovementsService } from '../services/movements.service';
import { Movement } from '../entities/movement.entity';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { VerifyUserMiddleware } from '../middleware/verifyUser.middleware';
import { AppController } from '../controllers/app.controller';
import { TokensController } from '../controllers/tokens.controller';
import { AuthService } from '../services/auth.service';
import { UsersModule } from './users.module';
import { TokensModule } from './tokens.module';
import { MovementsModule } from './movements.module';
import { AuthModule } from './auth.module';
import { GoogleStrategy } from '../strategies/google.strategy';

@Module({
  controllers: [ViewsController],
  imports: [
    TokensModule,
    AuthModule,
    MovementsModule,
    UsersModule,
    TypeOrmModule.forFeature([Movement, User]),
  ],
  providers: [
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class ViewsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(VerifyUserMiddleware).forRoutes(ViewsController);
  }
}
