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

@Module({
  controllers: [TokensController],
  imports: [TypeOrmModule.forFeature([User, Movement, PoWR])],
  providers: [TokensService, MovementsService, PoWRService, UsersService],
  exports: [TokensService],
})
export class TokensModule {}
