import { Movement } from '../../entities/movement.entity';
import { toPriceableString } from '../../../shared/utils/priceFormatter';

export class HomeDto {
  money: string;
  tokens: string;
  tokens_float: number;
  last_movements: HomeMovementDto[];
  username: string;
  token_price: string;
  token_price_float: number;
  user_id: number;
}

export class HomeMovementDto {
  constructor(mov: Movement) {
    this.type = mov.burned ? 'BURNED' : 'MINTED';
    this.burned = mov.burned;
    this.description = mov.description;
    this.amount = toPriceableString(mov.amount, false);
    this.date = mov.date;
  }

  type: string;
  description: string;
  amount: string;
  date: Date;
  burned: boolean;
}
