// ./src/server/app.controller.ts
import {
    Logger, Res,
    UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import {ParamsInterceptor} from './params.interceptor';
import {ConfigInterceptor} from '../config/config.interceptor';
import {Controller, Get, Param, Render} from '@nestjs/common';
import {AppService} from '../services/app.service';
import {DefaultErrorFilter} from './default-error.filter';
import {Response} from "express";

@Controller()
@UseFilters(new DefaultErrorFilter())
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('/')
    @Render('index')
    @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
    home() {
        return {};
    }

    @Get('/login')
    @Render('login')
    @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
    public login() {
        return {};
    }

    @Get('/account')
    @Render('account')
    @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
    public account() {
        return {};
    }

    @Get('/home')
    //@UseGuards(AuthGuard('google'))
    @Render('home')
    @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
    public home_user() {
        return {};
    }

    @Get('/acreditacion')
    @Render('acreditacion')
    @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
    public acreditacion() {
        return {};
    }

}
