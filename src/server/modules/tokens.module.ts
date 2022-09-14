import { Module } from '@nestjs/common';
import { TokensController } from '../controllers/tokens.controller';
import { TokensService } from '../services/tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '../entities/wallet.entity';

@Module({
  controllers: [TokensController],
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
