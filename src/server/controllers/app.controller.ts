// ./src/server/app.controller.ts
import { Logger, UseFilters, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { ParamsInterceptor } from './params.interceptor';
import { ConfigInterceptor } from '../config/config.interceptor';
import { Controller, Get, Param, ParseIntPipe, Render } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { DefaultErrorFilter } from './default-error.filter';
import { AuthGuard } from "@nestjs/passport";


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

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req)
  }

/*
  @Get(':id')
  @Render('[id]')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public blogPost(@Param('id') id: string) {
    return { id };
  }
*/

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
