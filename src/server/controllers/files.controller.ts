import {
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { DefaultErrorFilter } from './default-error.filter';

@Controller('files')
@UseFilters(new DefaultErrorFilter())
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadFile(
    @UploadedFile() file: Array<Express.Multer.File>,
    @Res() response,
  ) {
    console.log(file);
    return response.status(HttpStatus.OK).json(file);
  }
}
