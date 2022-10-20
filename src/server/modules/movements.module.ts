import { Module } from '@nestjs/common';
import { Movement } from '../entities/movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementsController } from '../controllers/movements.controller';
import { MovementsService } from '../services/movements.service';

@Module({
  controllers: [MovementsController],
  imports: [TypeOrmModule.forFeature([Movement])],
  providers: [MovementsService],
  exports: [MovementsService],
})
export class MovementsModule {}
