// auth.controller.ts

import {Controller, Get, Render, Req, Res, UseGuards} from '@nestjs/common';
import {Request, Response} from 'express';
import {GoogleAuthGuard} from '../../../shared/utils/Guards';
import {AuthService} from "../../services/auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return {msg: 'Google Authentication'};
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    @Render('account')
    handleRedirect(@Res() res: Response, @Req() req: Request) {
        res.cookie('accessToken', req.user.accessToken);
        return this.authService.getGoogleLogin(req, res);
    }

    @Get('status')
    user(@Req() request: Request) {
        return {msg: 'autenticado'}
    }
}