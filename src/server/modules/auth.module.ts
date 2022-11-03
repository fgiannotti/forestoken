import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthController } from '../controllers/auth/auth.controller';
import { AuthService } from '../services/auth.service';
import { GoogleStrategy } from '../strategies/google.strategy';
import { VerifyUserMiddleware } from '../middleware/verifyUser.middleware';
import { AppController } from '../controllers/app.controller';
import { TokensController } from '../controllers/tokens.controller';
import { UsersModule } from './users.module';
import { UsersService } from '../services/users.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    VerifyUserMiddleware,
    {
      provide: 'USERS_SERVICE',
      useClass: UsersService,
    },
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(VerifyUserMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: '/auth/(.*)', method: RequestMethod.GET },
      )
      .forRoutes(AppController, TokensController);
  }
}
