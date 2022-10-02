import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Movement } from '../entities/movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '../entities/wallet.entity';
import { MovementsController } from '../controllers/movements.controller';
import { MovementsService } from '../services/movements.service';

@Module({
  controllers: [MovementsController],
  imports: [TypeOrmModule.forFeature([User, Movement, Wallet])],
  providers: [MovementsService],
  exports: [MovementsService],
})
export class MovementsModule {}
