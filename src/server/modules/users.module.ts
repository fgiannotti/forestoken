import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Movement } from '../entities/movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementsService } from '../services/movements.service';
import { Wallet } from '../entities/wallet.entity';
import { WalletsService } from '../services/wallets.service';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, Movement, Wallet])],
  providers: [UsersService, MovementsService, WalletsService],
  exports: [UsersService],
})
export class UsersModule {}
