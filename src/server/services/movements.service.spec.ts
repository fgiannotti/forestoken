import { MovementsService } from './movements.service';
import { Movement } from '../entities/movement.entity';
import {
  createConnection,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { MockType, repositoryMockFactory } from './users.service.spec';
import { MovementDto } from '../dtos/movement.dto';
import { UserDto } from '../dtos/user.dto';
import {
  createMockMovement,
  createMockMovementDto,
  createMockUser,
  createMockUserDto,
} from '../../../test/test-utils';

describe('MovementsService', () => {
  let service: MovementsService;
  let repositoryMock: MockType<Repository<User>>;
  let mockUser: User;
  let mockUserDto: UserDto;
  let mockMovementDto: MovementDto;
  let mockMovement: Movement;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovementsService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(Movement),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    mockMovement = createMockMovement();
    mockMovementDto = createMockMovementDto();
    service = module.get<MovementsService>(MovementsService);
    repositoryMock = module.get(getRepositoryToken(Movement));
  });

  it('should find a mockUser', async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.findOneBy.mockReturnValue(mockMovement);
    const actual = await service.findOne(mockMovement.id);
    expect(actual).toStrictEqual(mockMovement);
    // And make assertions on how often and with what params your mock's methods are called
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
      id: mockMovement.id,
    });
  });
});
// -------In memory DB-------
describe('MovementsService WITH IN MEMORY DB', () => {
  let service: MovementsService;
  let repository: Repository<Movement>;
  let userRepoAux: Repository<User>;
  let mockUserDto: UserDto;
  let mockMovementDto: MovementDto;
  let mockMovement: Movement;

  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [User, Movement],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });
    mockUserDto = createMockUserDto();
    mockMovement = createMockMovement();
    mockMovementDto = createMockMovementDto();

    userRepoAux = getRepository(User, testConnectionName);
    repository = getRepository(Movement, testConnectionName);
    service = new MovementsService(repository);

    return connection;
  });

  afterEach(async () => {
    await getConnection(testConnectionName).close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return movement for findOne', async () => {
    // insert user + movement into in-memory db
    const userRes = await userRepoAux.insert(mockUserDto);
    mockMovementDto.userId = userRes.generatedMaps[0].id;
    mockMovement.userId = userRes.generatedMaps[0].id;
    const res = await repository.insert(mockMovementDto);

    // test data retrieval itself
    const actual = await service.findOne(res.generatedMaps[0].id);
    mockMovement.id = res.generatedMaps[0].id;
    expect(actual).toEqual(mockMovement);
  });
});
