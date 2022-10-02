import { MovementsService } from './movements.service';
import { Movement } from '../entities/movement.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { MockType, repositoryMockFactory } from './users.service.spec';
import { MovementDto } from '../dtos/movement.dto';
import {
  createMockMovement,
  createMockMovementDto,
} from '../../test/test-utils';
import { Wallet } from '../entities/wallet.entity';

describe('MovementsService', () => {
  let service: MovementsService;
  let repositoryMock: MockType<Repository<User>>;
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
        {
          provide: getRepositoryToken(Wallet),
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
