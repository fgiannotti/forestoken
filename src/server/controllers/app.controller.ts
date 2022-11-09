// ./src/server/app.controller.ts
import { Logger, UseFilters, UseInterceptors } from '@nestjs/common';
import { ParamsInterceptor } from './params.interceptor';
import { ConfigInterceptor } from '../config/config.interceptor';
import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { DefaultErrorFilter } from './default-error.filter';

@Controller()
@UseFilters(new DefaultErrorFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get('/home')
  @Render('home')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public home_user() {
    return {};
  }

  @Get('/accreditation')
  @Render('accreditation')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public accreditation() {
    return {};
  }
  @Get('/affiliates')
  @Render('affiliates')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public affiliates() {
    return {};
  }

  @Get('/movimientos')
  @Render('movimientos')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public movimientod() {
    return {};
  }

  @Get('/admin')
  @Render('admin')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public admin() {
    return {};
  }

  @Get('/account')
  @Render('account')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public accountCreation() {
    return {};
  }

  @Get('/api/blog-posts')
  listBlogPosts() {
    return this.appService.getBlogPosts();
  }

  @Get('/api/blog-posts/:id')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public getBlogPostById(@Param('id') id: number) {
    Logger.log(`getBlogPostById called with Id ${id}`, AppController.name);
    return this.appService.getBlogPost(id);
  }
}
