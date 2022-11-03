import {HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod,} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import {AuthController} from '../controllers/auth/auth.controller';
import {AuthService} from '../services/auth.service';
import {GoogleStrategy} from '../strategies/google.strategy';
import {SessionSerializer} from '../../shared/utils/Serializer';
import {LoggerMiddleware} from '../middleware/verifyUser.middleware';
import {AppController} from '../controllers/app.controller';
import {TokensController} from '../controllers/tokens.controller';
import {UsersService} from '../services/users.service';
import {PaymentsController} from "../controllers/payments.controller";
import {MovementsController} from "../controllers/movements.controller";
import {FilesController} from "../controllers/files.controller";
import {AffiliatesController} from "../controllers/affiliates.controller";
import {UsersController} from "../controllers/users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    AuthService,
    UsersService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: '/auth/(.*)', method: RequestMethod.GET },
          {path:'/users',method: RequestMethod.POST}
      )
      .forRoutes(AppController, TokensController, PaymentsController, MovementsController, FilesController, AffiliatesController, UsersController);
  }
}
