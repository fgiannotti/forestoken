import { HomeDto, HomeMovementDto } from './home.dto';
import { Movement } from '../../entities/movement.entity';
import { toPriceableString } from '../../../shared/utils/priceFormatter';

export class homeBuilder {
  protected tokenPrice: number;
  protected home: HomeDto;

  constructor(tokenPrice: number) {
    this.home = new HomeDto();
    this.tokenPrice = tokenPrice;
    this.home.token_price = toPriceableString(tokenPrice, true);
  }

  build(): HomeDto {
    return this.home;
  }
  withUsername(username: string): homeBuilder {
    this.home.username = username;
    return this;
  }
  withBalance(tokensAmount: number): homeBuilder {
    const money = tokensAmount * this.tokenPrice;
    this.home.money = toPriceableString(money, true);
    this.home.tokens = toPriceableString(tokensAmount, false);
    return this;
  }

  withMovements(movements: Movement[]): homeBuilder {
    const homeMovements: HomeMovementDto[] = movements.map(
      (mov) => new HomeMovementDto(mov),
    );
    this.home.last_movements = homeMovements;
    return this;
  }
}
