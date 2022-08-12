// ./src/server/app.controller.ts
import { Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { ParamsInterceptor } from './params.interceptor';
import { Controller, Get, Param, ParseIntPipe, Render } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ConfigInterceptor } from '../config/config.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  home(@Res() res: Response) {
    return res.render('index');
  }

  @Get(':id')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public blogPost(@Res() res: Response, @Param('id') id: string) {
    return res.render('[id]', { id });
  }

  @Get('/api/blog-posts')
  listBlogPosts() {
    return this.appService.getBlogPosts();
  }

  @Get('/api/blog-posts/:id')
  public getBlogPostById(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.getBlogPost(id);
  }
}
