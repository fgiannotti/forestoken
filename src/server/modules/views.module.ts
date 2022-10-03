import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Movement } from '../entities/movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '../entities/wallet.entity';
import { WalletsService } from '../services/wallets.service';
import { ViewsController } from '../controllers/views/views.controller';
import { TokensService } from '../services/tokens.service';

@Module({
  controllers: [ViewsController],
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [TokensService, WalletsService],
  exports: [],
})
export class ViewsModule {}
