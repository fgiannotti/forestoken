import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';

import { TokensService } from '../services/tokens.service';
import { DefaultErrorFilter } from './default-error.filter';
import { MovementsService } from '../services/movements.service';
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
  async createPayment(@Res() response, @Body() body) {
    // PENDING:
    // 1. BURN POWR
    // 2. CREATE MOVEMENT

    const amount = body.amount;
    const affiliateId: string = body.affiliateId;
    const paymentId: string = await this.paymentsService.transfer(
      amount,
      affiliateId,
    );

    return response.status(HttpStatus.OK).json(paymentId);
  }
}
