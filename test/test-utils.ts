import { UserDto } from '../src/server/dtos/user.dto';
import { User } from '../src/server/entities/user.entity';
import { MovementDto } from '../src/server/dtos/movement.dto';
import { Movement } from '../src/server/entities/movement.entity';

export function createMockUserDto(): UserDto {
  return {
    walletId: 'test',
    name: 'rakki',
    mail: '@123',
    movements: [],
  } as UserDto;
}

export function createMockUser(): User {
  return {
    id: 123,
    walletId: 'test',
    name: 'rakki',
    mail: '@123',
    movements: [],
  } as User;
}

export function createMockMovementDto(): MovementDto {
  return {
    userId: 123,
    description: 'rakki',
    burned: false,
    amount: 101,
  } as MovementDto;
}

export function createMockMovement(): Movement {
  const user = createMockUser();
  return {
    userId: user.id,
    description: 'rakki',
    burned: false,
    amount: 101,
  } as Movement;
}
