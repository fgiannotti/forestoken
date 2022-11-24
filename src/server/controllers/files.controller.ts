import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { DefaultErrorFilter } from './default-error.filter';
import { FileService } from '../services/file.service';

@Controller('files')
@UseFilters(new DefaultErrorFilter())
export class FilesController {
  constructor(private filesService: FileService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadFile(
    @UploadedFile() file: Array<Express.Multer.File>,
    @Res() response,
  ) {
    return response.status(HttpStatus.OK).json(file);
  }

  @Get('/uploads/:id')
  async getFile(@Param('id') id: string, @Res() res) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename= download.pdf');
    return res.sendFile(id, { root: './uploads' });
  }
}
