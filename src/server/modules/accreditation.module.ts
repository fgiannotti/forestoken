import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccreditationsController } from '../controllers/accreditation.controller';
import { AccreditationsService } from '../services/accreditations.service';
import { Accreditation } from '../entities/accreditation.entity';

@Module({
  controllers: [AccreditationsController],
  imports: [TypeOrmModule.forFeature([Accreditation])],
  providers: [AccreditationsService],
  exports: [AccreditationsService],
})
export class AccreditationModule {}
