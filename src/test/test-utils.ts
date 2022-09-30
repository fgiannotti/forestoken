import { UserDto } from '../server/dtos/user.dto';
import { User } from '../server/entities/user.entity';
import { MovementDto } from '../server/dtos/movement.dto';
import { Movement } from '../server/entities/movement.entity';
import { Wallet } from '../server/entities/wallet.entity';
import { ProducerType } from '../server/entities/producerType.enum';
import { TaxSubjectType } from '../server/entities/taxSubjectType.enum';

export function createMockUserDto(): UserDto {
  return {
    name: 'rakki',
    mail: '123@gmail.com',
    dni: '12345678',
    producerType: ProducerType.Individuo,
    provincia: 'BUE',
    city: 'CABA',
    address: 'Casa',
    postalCode: '1010',
    taxSubjectType: TaxSubjectType.Monotributista,
    isPoliticPerson: false,
    isRegulatedPerson: false,
    dateOfBirth: new Date('2000-01-01'),
    photoUrl: 'foto.com',
  } as UserDto;
}

export function createMockUser(): User {
  return {
    id: 123,
    walletId: 'test',
    name: 'rakki',
    mail: '123@gmail.com',
    dni: '12345678',
    producerType: 'Empresa',
    provincia: 'BUE',
    city: 'CABA',
    address: 'Casa',
    postalCode: '1010',
    taxSubjectType: 'Monotributista',
    isPoliticPerson: false,
    isRegulatedPerson: false,
    dateOfBirth: new Date('2000-01-01'),
    photoUrl: 'foto.com',
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

export function createInvalidStrings(): any[] {
  return [true, false, 1, 2, null, undefined];
}

export function createInvalidMails(): string[] {
  return [
    null,
    undefined,
    'invalidemail@',
    'invalid.com',
    '@invalid.com',
    'foo@bar.com.',
    'somename@ｇｍａｉｌ.com',
    'foo@bar.co.uk.',
    'z@co.c',
    'gmail...ignores...dots...@gmail.com',
    'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com',
  ];
}

export function createInvalidNumbers(): string[] {
  return [' ', '.', 'a', '1a', 'a1', '1.1', '1,1', '1 1', '1 1 1', '1,1,1'];
}

export function createInvalidProducerTypes(): string[] {
  return  [' ', 'Empresa, Individuo', null, undefined];
}

export function createInvalidtaxSubjectType(): string[] {
  return  [' ', null, undefined, 'Monotributista, Responsable Inscripto',
    'Monotributista, Responsable Inscripto, Exento',
    'Responsable Inscripto, Exento',
    'Exento'];
}

export function createInvalidPostalCodes(): string[] {
  return [null, undefined, ' ', '123', '1234a', '12345', 'abcd'];
}

export function createInvalidBooleans(): any[] {
  return [null, undefined, ' ', 'true', 'false', '1', '0', 1, 0];
}

export function createInvalidDates(): any[] {
  return [
    true,
    false,
    1,
    2,
    null,
    undefined,
    'text',
    'text2018-01-04T08:15:30+04',
    '2018-01-04T08:15:30Ztext',
    '2019-18-13T22:14:14.761Z', // month greater than 12
    '2019-12-39T22:14:14.761Z', // day greater than 31
    '2019-12-31T29:14:14.761Z', // hour greater than 24
    '2019-00-31T29:14:14.761Z', // month of 0
    '2019-01-00T29:14:14.761Z', // day of 0
    '2019-09-03T20:16:24.12-5:00', // single digit hour in timezone offset
    '2019-09-03T20:16:24.12+5:00',
    '2019-09-03T20:16:24.12-05:0', // single digit minute in timezone offset
    '2019-09-03T20:16:24.12+05:0',
  ];
}

export function createInvalidUrls(): string[] {
  return [null, undefined,
    'xyz://foobar.com',
    'invalid/', 'invalid.x',
    'invalid.', '.com', 
    'http://com/', '',
    'http://300.0.0.1/',
    'mailto:foo@bar.com',
    'rtmp://foobar.com',
    'http://www.xn--.com/',
    'http://xn--.com/',
    'http://www.foobar.com:0/',
    'http://www.foobar.com:70000/',
    'http://www.foobar.com:99999/',
    'http://www.-foobar.com/',
    'http://www.foobar-.com/',
    'http://foobar/# lol',
    'http://foobar/? lol',
    'http://foobar/ lol/',
    'http://lol @foobar.com/',
    'http://lol:lol @foobar.com/',
    'http://lol:lol:lol@foobar.com/',
    'http://lol: @foobar.com/',
    'http://www.foo_bar.com/',
    'http://www.foobar.com/\t',
    'http://\n@www.foobar.com/',
    'http://localhost:61500this is an invalid url!!!!',
    'http://foobar.com/' + new Array(2083).join('f'),
    'http://*.foo.com',
    '*.foo.com', '!.foo.com',
    'http://example.com.',
    '////foobar.com',
    'http:////foobar.com'
  ];
}