import { MovementsService } from './movements.service';
import { Movement } from '../entities/movement.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createMockMovement,
  createMockMovementQueryDto,
  MockType,
  repositoryMockFactory
} from '../../test/test-utils';
import { MovementQueryDto } from '../dtos/movementQuery.dto';
import { MovementType } from '../entities/movementType.enum';

describe('MovementsService', () => {
  let service: MovementsService;
  let repositoryMock: MockType<Repository<Movement>>;
  let mockMovement: Movement;
  let mockMovementQueryDto: MovementQueryDto;

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
    mockMovementQueryDto = createMockMovementQueryDto();
    service = module.get<MovementsService>(MovementsService);
    repositoryMock = module.get(getRepositoryToken(Movement));
  });

  it('should find mockMovements filtering by userId', async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.find.mockReturnValue([mockMovement]);

    mockMovementQueryDto.movementType = undefined;
    const actual = await service.findByUserId(
      mockMovementQueryDto.userId,
      mockMovementQueryDto.movementType,
      mockMovementQueryDto.page,
      mockMovementQueryDto.pageSize,
    );

    expect(actual).toStrictEqual([mockMovement]);
    expect(repositoryMock.find).toHaveBeenCalledWith({
      where: { userId: mockMovementQueryDto.userId },
      order: { date : 'DESC' },
      skip: mockMovementQueryDto.page * mockMovementQueryDto.pageSize,
      take: mockMovementQueryDto.pageSize
    });
  });
  it('should find mockMovements filtering by userId and movementType.mint', async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.find.mockReturnValue([mockMovement]);

    mockMovementQueryDto.movementType = MovementType.mint;
    const actual = await service.findByUserId(
      mockMovementQueryDto.userId,
      mockMovementQueryDto.movementType,
      mockMovementQueryDto.page,
      mockMovementQueryDto.pageSize,
    );

    expect(actual).toStrictEqual([mockMovement]);
    expect(repositoryMock.find).toHaveBeenCalledWith({
      where: { userId: mockMovementQueryDto.userId,  burned: false },
      order: { date : 'DESC' },
      skip: mockMovementQueryDto.page * mockMovementQueryDto.pageSize,
      take: mockMovementQueryDto.pageSize
    });
  });
  it('should find mockMovements filtering by userId and movementType.burn', async () => {
    // Now you can control the return value of your mock's methods
    repositoryMock.find.mockReturnValue([mockMovement]);

    mockMovementQueryDto.movementType = MovementType.burn;
    const actual = await service.findByUserId(
      mockMovementQueryDto.userId,
      mockMovementQueryDto.movementType,
      mockMovementQueryDto.page,
      mockMovementQueryDto.pageSize,
    );

    expect(actual).toStrictEqual([mockMovement]);
    expect(repositoryMock.find).toHaveBeenCalledWith({
      where: { userId: mockMovementQueryDto.userId,  burned: true },
      order: { date : 'DESC' },
      skip: mockMovementQueryDto.page * mockMovementQueryDto.pageSize,
      take: mockMovementQueryDto.pageSize
    });
  });
});