import { Movement } from '../../entities/movement.entity';
import { toPriceableString } from '../../../shared/utils/priceFormatter';

export class HomeDto {
  money: string;
  tokens: string;
  last_movements: HomeMovementDto[];
}

export class HomeMovementDto {
  constructor(mov: Movement) {
    this.type = mov.burned ? 'BURNED' : 'MINTED';
    this.movement = mov.description;
    this.amount = toPriceableString(mov.amount, false);
  }

  type: string;
  movement: string;
  amount: string;
}
