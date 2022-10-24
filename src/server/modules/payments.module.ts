import { Module } from '@nestjs/common';
import { TokensController } from '../controllers/tokens.controller';
import { TokensService } from '../services/tokens.service';
import { MovementsService } from '../services/movements.service';
import { PoWRService } from '../services/powr.service';
import { UsersService } from '../services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Movement } from '../entities/movement.entity';
import { PoWR } from '../entities/powr.entity';
import { PaymentsController } from '../controllers/paymentsController';
import { PaymentsService } from '../services/payments.service';

@Module({
  controllers: [PaymentsController],
  imports: [TypeOrmModule.forFeature([Movement])],
  providers: [TokensService, MovementsService, PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
