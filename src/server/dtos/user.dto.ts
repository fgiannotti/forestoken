// DTO for user creation
import { Movement } from '../entities/movement.entity';

export class UserDto {
  name: string;
  mail: string;
  walletId: string;
  movements: Movement[] = null;
}
