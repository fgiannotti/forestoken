import {PassportSerializer} from '@nestjs/passport';
import {Inject, Injectable} from "@nestjs/common";
import {AuthService} from "../../server/services/auth.service";
import {User} from "../../server/entities/user.entity";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super();
    }

    serializeUser(user: User, done: Function): any {
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function): Promise<any> {
        const user = await this.authService.findUser(payload.id);
        return user ? done(null, user) : done(null, null)
    }
}