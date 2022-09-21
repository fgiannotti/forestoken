import {
  createConnection,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDto } from '../dtos/user.dto';
import { Movement } from '../entities/movement.entity';
import { Wallet } from '../entities/wallet.entity';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    findOneBy: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
  }),
);

const mockUser: User = {
  id: 123,
  name: 'Alni',
  mail: '@123',
  walletId: '123',
  dni: '1234',
  tipoProductor: 'Productor',
  provincia: 'BUE',
  ciudad: 'CABA',
  direccion: 'Casa',
  codigoPostal: '1010',
  responableTributo: 'Monotributo',
  personaPolitica: false,
  personaRegulada: false,
  fechaNacimiento: new Date('2000-01-01'),
  urlFoto: 'foto',
};

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Wallet),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should find a mockUser', async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.findOneBy.mockReturnValue(mockUser);
    const actual = await service.findOne(mockUser.id);
    expect(actual).toStrictEqual(mockUser);
    // And make assertions on how often and with what params your mock's methods are called
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: mockUser.id });
  });
});
// -------In memory DB-------
describe('UsersService WITH IN MEMORY DB', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [User, Movement, Wallet],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });

    repository = getRepository(User, testConnectionName);
    service = new UsersService(repository);

    return connection;
  });

  afterEach(async () => {
    await getConnection(testConnectionName).close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return company info for findOne', async () => {
    // insert user into in memory db
    const res = await repository.insert(mockUser);

    // test data retrieval itself
    const actual = await service.findOne(res.generatedMaps[0].id);
    mockUser.id = res.generatedMaps[0].id;
    expect(actual).toEqual(mockUser);
  });
});
