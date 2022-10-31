import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccreditationsController } from '../controllers/accreditation.controller';
import { AccreditationsService } from '../services/accreditations.service';
import { Accreditation } from '../entities/accreditation.entity';
import { FileService } from '../services/file.service';

@Module({
  controllers: [AccreditationsController],
  imports: [TypeOrmModule.forFeature([Accreditation])],
  providers: [AccreditationsService, FileService],
  exports: [AccreditationsService],
})
export class AccreditationModule {}
