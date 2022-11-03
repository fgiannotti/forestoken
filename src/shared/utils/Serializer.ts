import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../server/entities/user.entity';
import { UsersService } from '../../server/services/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject()
    private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void): any {
    done(null, user);
  }

  async deserializeUser(
    payload: any,
    done: (err, user: User) => void,
  ): Promise<any> {
    const user = await this.userService.findOne(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
