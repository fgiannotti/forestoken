import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '../entities/wallet.entity';
import { WalletsService } from '../services/wallets.service';
import { ViewsController } from '../controllers/views/views.controller';
import { TokensService } from '../services/tokens.service';
import { MovementsService } from '../services/movements.service';
import { Movement } from '../entities/movement.entity';

@Module({
  controllers: [ViewsController],
  imports: [TypeOrmModule.forFeature([Wallet, Movement])],
  providers: [TokensService, WalletsService, MovementsService],
  exports: [],
})
export class ViewsModule {}
