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
import { AccreditationsService } from '../services/accreditations.service';
import { Accreditation } from '../entities/accreditation.entity';
import { FileService } from '../services/file.service';

@Module({
  controllers: [TokensController],
  imports: [TypeOrmModule.forFeature([Accreditation, Movement, PoWR, User])],
  providers: [
    AccreditationsService,
    FileService,
    MovementsService,
    PoWRService,
    TokensService,
    UsersService,
  ],
  exports: [TokensService],
})
export class TokensModule {}
