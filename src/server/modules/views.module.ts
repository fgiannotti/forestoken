import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewsController } from '../controllers/views/views.controller';
import { TokensService } from '../services/tokens.service';
import { MovementsService } from '../services/movements.service';
import { Movement } from '../entities/movement.entity';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Module({
  controllers: [ViewsController],
  imports: [TypeOrmModule.forFeature([Movement, User])],
  providers: [TokensService, MovementsService, UsersService],
  exports: [],
})
export class ViewsModule {}
