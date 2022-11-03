import {
  UnauthorizedException,
  Injectable,
  NestMiddleware,
  Inject,
} from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { AuthService } from '../services/auth.service';

// Middleware que recibe el accessToken de las cookies
// Y lo valida contra google y nuestra DB
@Injectable()
export class VerifyUserMiddleware implements NestMiddleware {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['accessToken'];

    if (typeof accessToken === 'undefined') {
      throw new UnauthorizedException('No access token provided');
    }
    const loggedIn = await this.authService.existsUser(accessToken);

    if (!loggedIn) {
      res.redirect('auth/google/login');
    } else {
      next();
    }
  }
}
