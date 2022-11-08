// auth.controller.ts

import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/redirect')
  // esto te envia al form de google y volves con el req.user completado
  // para ver si ir al home o al form de account
  @UseGuards(AuthGuard('google'))
  async handleRedirectGoogle(@Res() res: Response, @Req() req: Request) {
    res.cookie('accessToken', req.user.accessToken);

    // VOLVIO DEL FORM DE GOOGLE. ESTA LOGEADO?
    const user = await this.authService.getUserFromAccessToken(
      req.user.accessToken,
    );
    const userLoggedIn = user !== null;
    if (userLoggedIn) {
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
