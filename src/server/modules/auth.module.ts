import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import {AuthController} from '../controllers/auth/auth.controller';
import {AuthService} from '../services/auth.service';
import {GoogleStrategy} from '../strategies/google.strategy';
import {SessionSerializer} from '../../shared/utils/Serializer';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [
        GoogleStrategy,
        SessionSerializer,
        AuthService,
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService,
        },
    ],
})
export class AuthModule {
}