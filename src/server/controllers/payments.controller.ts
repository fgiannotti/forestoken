import { Body, Controller, HttpStatus, Logger, Post, Res, UseFilters } from '@nestjs/common';
import { ConsumablePowr, TokensService } from '../services/tokens.service';
import { DefaultErrorFilter } from './default-error.filter';
import { MovementsService } from '../services/movements.service';
import { PaymentsService } from '../services/payments.service';
import { WalletsService } from '../services/wallets.service';
import { PaymentDto } from '../dtos/payment.dto';

export class UnsufficientTokensError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnsufficientTokensError';
  }
}

@Controller('/payments')
@UseFilters(new DefaultErrorFilter())
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);

  constructor(private paymentsService: PaymentsService, private tokensService: TokensService, private movementsService: MovementsService, private walletsService: WalletsService) {}

  @Post()
  async createPayment(@Res() response, @Body() body: PaymentDto) {
    const amountToPay = body.amount_to_pay;
    const tokensToConsume = body.tokens_consumed;
    const userId = body.user_id;
    const affiliateId = body.affiliate_id;
    // How do I know the PoWR (hashes) to burn? I need a PoWR that is not already burned
    // And also, it is possible that you need to burn several PoWR to perform that payment.

    const wallet = await this.walletsService.findByUserId(userId);
    const usableEvents = await this.tokensService.getConsumablesPowr(wallet.address);
    const tokensBalance = usableEvents.reduce((acc, event) => acc + event.tokensStillAvailable, 0);
    if (tokensBalance < tokensToConsume) {
      throw new UnsufficientTokensError(`Not enough tokens (${tokensBalance}) to do payment of ${tokensToConsume} tokens`);
    }
    await this.burnPowrsAsNeeded(wallet.address, usableEvents, tokensToConsume);
    const paymentId: string = await this.paymentsService.transfer(amountToPay, affiliateId);

    const movementDto = {
      userId: userId,
      description: 'Consumo de tokens',
      burned: true,
      amount: tokensToConsume,
      powrId: null, // TODO: fix somehow, debate if the entity is really needed in the DB
      date: new Date(),
    };
    await this.movementsService.create(movementDto);
    return response.status(HttpStatus.OK).json(paymentId);
  }

  private async burnPowrsAsNeeded(userAddress: string, usableEvents: ConsumablePowr[], tokensToPay: number) {
    // SORT by tokensStillAvailable
    usableEvents.sort((a, b) => a.tokensStillAvailable - b.tokensStillAvailable);
    while (tokensToPay > 0) {
      const powr = usableEvents.shift(); // remove first element
      const tokensToBurn = Math.min(powr.tokensStillAvailable, tokensToPay);
      await this.tokensService.burnTokensWithPowr(powr.mintedPoWR.returnValues.saleContract, powr.mintedPoWR.returnValues.depositCert, powr.mintedPoWR.returnValues.collectionRightsContract, userAddress, tokensToBurn);
      tokensToPay -= tokensToBurn;
    }
  }
}
