import { Module } from '@nestjs/common';
import { TokensService } from '../services/tokens.service';
import { MovementsService } from '../services/movements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from '../entities/movement.entity';
import { PaymentsController } from '../controllers/payments.controller';
import { PaymentsService } from '../services/payments.service';
import { WalletsService } from '../services/wallets.service';
import { Wallet } from '../entities/wallet.entity';

@Module({
  controllers: [PaymentsController],
  imports: [TypeOrmModule.forFeature([Movement, Wallet])],
  providers: [TokensService, MovementsService, PaymentsService, WalletsService],
  exports: [PaymentsService],
})
export class PaymentsModule {
}
