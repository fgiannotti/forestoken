import { Module } from '@nestjs/common';
import { FilesController } from '../controllers/files.controller';
import { FileService } from '../services/file.service';

@Module({
  controllers: [FilesController],
  providers: [FilesController, FileService],
  exports: [FilesController],
})
export class FilesModule {}
