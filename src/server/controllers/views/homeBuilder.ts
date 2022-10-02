import { HomeDto, HomeMovementDto } from './home.dto';
import { Movement } from '../../entities/movement.entity';
import { toPriceableString } from '../../../shared/utils/priceFormatter';

export class homeBuilder {
  private readonly tokenPrice = 1000;
  private home: HomeDto;

  constructor() {
    this.home = new HomeDto();
  }

  build(): HomeDto {
    return this.home;
  }

  withBalance(tokensAmount: number): homeBuilder {
    const money = tokensAmount * this.tokenPrice;
    this.home.money = toPriceableString(money);
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
