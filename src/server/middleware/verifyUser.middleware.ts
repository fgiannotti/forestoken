import {
  Inject,
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';

// Middleware que recibe el accessToken de las cookies
// Y lo valida contra google y nuestra DB
@Injectable()
export class VerifyUserMiddleware implements NestMiddleware {
  private readonly logger = new Logger(VerifyUserMiddleware.name);
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies['accessToken'];
      const idToken = req.headers['idtoken'] as string;

      if (accessToken === undefined && idToken === undefined) {
        throw new UnauthorizedException('No access token or id Token provided');
      }
      const user = await this.checkTokens(accessToken, idToken);

      const loggedIn = user !== null;
      if (!loggedIn) {
        this.logger.warn(
          'User doesnt exist in DB. AT: [' + accessToken + '] IDT: ' + idToken,
        );
        res.redirect(process.env.HOST + 'auth/google/redirect');
      } else {
        res.locals.userId = user.id.toString();
        next();
      }
    } catch (e) {
      this.logger.error('ERROR verifying user, redirecting to login.' + e);
      throw new UnauthorizedException('ERROR verifying user' + e);
    }
  }

  private async checkTokens(
    accessToken: string,
    idToken: string,
  ): Promise<User> {
    if (accessToken !== undefined) {
      return await this.authService.getUserFromAccessToken(accessToken);
    }
    if (idToken !== undefined) {
      return await this.authService.getUserFromIdToken(idToken);
    }
    return undefined;
  }
}
