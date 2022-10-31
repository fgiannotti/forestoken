import { Module } from '@nestjs/common';
import { TokensService } from '../services/tokens.service';
import { MovementsService } from '../services/movements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from '../entities/movement.entity';
import { PaymentsController } from '../controllers/payments.controller';
import { PaymentsService } from '../services/payments.service';

@Module({
  controllers: [PaymentsController],
  imports: [TypeOrmModule.forFeature([Movement])],
  providers: [TokensService, MovementsService, PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
