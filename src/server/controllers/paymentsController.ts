import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';

import { TokensService } from '../services/tokens.service';
import { DefaultErrorFilter } from './default-error.filter';
import { MovementsService } from '../services/movements.service';
import { PoWRService } from '../services/powr.service';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { MovementDto } from '../dtos/movement.dto';
import { PoWRDto } from "../dtos/powr.dto";
import { PaymentsService } from '../services/payments.service';

@Controller('/payments')
@UseFilters(new DefaultErrorFilter())
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);

  constructor(
    private paymentsService: PaymentsService,
    private tokensService: TokensService,
    private movementsService: MovementsService,
  ) {}

  @Post()
  async createPayment(@Res() response, @Param('id') id, @Body() body) {
    // PENDING:
    // 1. BURN POWR
    // 2. CREATE MOVEMENT

    const amount = body.amount;
    const affiliateId: string = body.affiliateId;
    const paymentId: string = await this.paymentsService.createPayment(amount, affiliateId);

    return response.status(HttpStatus.OK).json(paymentId);
  }

}
