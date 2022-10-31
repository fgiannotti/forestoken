// auth.controller.ts

import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from '../../../shared/utils/Guards';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Render('account')
  async handleRedirect(@Res() res: Response, @Req() req: Request) {
    res.cookie('accessToken', req.user.accessToken);
    const user = (await this.usersService.findBy({ mail: req.user.mail }))[0];
    res.cookie(
      'userData',
      `userId|${user.id}|userImage|${req.user.photoUrl}|userName|${req.user.displayName}`,
    );

    return this.authService.getGoogleLogin(req, res);
  }
}
