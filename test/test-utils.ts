import { UserDto } from '../src/server/dtos/user.dto';
import { User } from '../src/server/entities/user.entity';
import { MovementDto } from '../src/server/dtos/movement.dto';
import { Movement } from '../src/server/entities/movement.entity';
import { Wallet } from 'src/server/entities/wallet.entity';

export function createMockUserDto(): UserDto {
  return {
    walletId: 'test',
    name: 'rakki',
    mail: '@123',
    dni: '12345678',
    tipoProductor: 'Empresa',
    provincia: 'BUE',
    ciudad: 'CABA',
    direccion: 'Casa',
    codigoPostal: '1010',
    responsableTributo: 'Monotributista',
    personaPolitica: false,
    personaRegulada: false,
    fechaNacimiento: new Date('2000-01-01'),
    urlFoto: 'foto.com',
    movements: [],
  } as UserDto;
}

export function createMockUser(): User {
  return {
    id: 123,
    walletId: 'test',
    name: 'rakki',
    mail: '@123',
    dni: '12345678',
    tipoProductor: 'Empresa',
    provincia: 'BUE',
    ciudad: 'CABA',
    direccion: 'Casa',
    codigoPostal: '1010',
    responsableTributo: 'Monotributista',
    personaPolitica: false,
    personaRegulada: false,
    fechaNacimiento: new Date('2000-01-01'),
    urlFoto: 'foto.com',
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

export function createMockWallet(): Wallet {
  const user = createMockUser();
  return {
    address: '0xDF3e2d7650A6C17F102D51Db58B280580F825371',
    privateKey: 'afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890',
    userId: user.id,
  } as Wallet;
}