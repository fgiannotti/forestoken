// auth.controller.ts

import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // esto te envia al form de google y volves con el req.user completado
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async handleRedirectGoogle(@Res() res: Response, @Req() req: Request) {
    res.cookie('accessToken', req.user.accessToken);

    // VOLVIO DEL FORM DE GOOGLE. ESTA LOGEADO?
    if (await this.authService.existsUser(req.user.accessToken)) {
      const user = (await this.usersService.findBy({ mail: req.user.mail }))[0];
      res.cookie(
        'userData',
        `userId|${user.id}|userImage|${req.user.photoUrl}|userName|${req.user.displayName}`,
      );
      return res.redirect('/home');
    } else {
      // RENDER ACCOUNT FORM
      return res.render('account', req.user);
    }
  }
}
