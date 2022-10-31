import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccreditationsController } from '../controllers/accreditation.controller';
import { AccreditationsService } from '../services/accreditations.service';
import { Accreditation } from '../entities/accreditation.entity';
import { FileService } from '../services/file.service';
import { AffiliatesController } from '../controllers/affiliates.controller';
import { AffiliatesService } from '../services/affiliates.service';

@Module({
  controllers: [AffiliatesController],
  imports: [],
  providers: [AffiliatesController],
  exports: [AffiliatesService],
})
export class AffiliatesModule {}
