import { HomeDto, HomeMovementDto } from './home.dto';
import { Movement } from '../../entities/movement.entity';
import { toPriceableString } from '../../../shared/utils/priceFormatter';

export class homeBuilder {
  protected tokenPrice: number;
  protected home: HomeDto;

  constructor(tokenPrice: number) {
    this.home = new HomeDto();
    this.tokenPrice = tokenPrice;
    this.home.token_price_float = tokenPrice;
    this.home.token_price = toPriceableString(tokenPrice, true);
  }

  build(): HomeDto {
    return this.home;
  }
  withUser(username: string, userId: number): homeBuilder {
    this.home.username = username;
    this.home.user_id = userId;
    return this;
  }
  withBalance(tokensAmount: number): homeBuilder {
    const money = tokensAmount * this.tokenPrice;

    this.home.money = toPriceableString(Number(money.toFixed(2)), true);
    this.home.tokens = toPriceableString(tokensAmount, false);
    this.home.tokens_float = tokensAmount;
    return this;
  }

  withMovements(movements: Movement[]): homeBuilder {
    this.home.last_movements = movements.map((mov) => new HomeMovementDto(mov));
    return this;
  }
}
