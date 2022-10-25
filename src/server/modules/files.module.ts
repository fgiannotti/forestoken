import { Module } from '@nestjs/common';
import { FilesController } from '../controllers/files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesController],
  exports: [FilesController],
})
export class FilesModule {}
