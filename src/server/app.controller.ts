// ./src/server/app.controller.ts
import { Controller, Get, Param, ParseIntPipe, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { map, toArray } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  home() {
    return {};
  }

  @Get(':id')
  @Render('[id]')
  public blogPost(@Param('id') id: string) {
    return { id };
  }

  @Get('/api/blog-posts')
  listBlogPosts() {
    console.log('---------------- endpoint list called');
    return this.appService.getBlogPosts();
  }

  @Get('/api/blog-posts/:id')
  public getBlogPostById(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.getBlogPost(id);
  }
}
