import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { createResponse, MockResponse } from 'node-mocks-http';
import {
  createMockListMovements,
  createMockMovementQueryDto,
} from '../../test/test-utils';
import { MovementsService } from '../services/movements.service';
import { MovementsController } from './movements.controller';
import { Movement } from '../entities/movement.entity';
import { MovementQueryDto } from '../dtos/movementQuery.dto';

const TEST_ERR = Error('F');

describe('MovementController', () => {
  let controller: MovementsController;
  let movementsService: MovementsService;
  let response: MockResponse<Response>;
  let mockMovements: Movement[];
  let mockMovementQueryDto: MovementQueryDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementsController],
      providers: [
        {
          provide: MovementsService,
          useValue: {
            findByUserId: jest.fn().mockImplementation(),
          },
        },
      ],
    }).compile();
    mockMovements = createMockListMovements();
    mockMovementQueryDto = createMockMovementQueryDto();
    movementsService = module.get<MovementsService>(MovementsService);
    controller = module.get<MovementsController>(MovementsController);
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByUserId tests', () => {
    it('should return an array of movements and OK', async () => {
      const list: Movement[] = mockMovements;
      const jsonMovements: Object[] = JSON.parse(
        JSON.stringify(mockMovements.map((mov) => controller.toDto(mov))),
      );
      jest.spyOn(movementsService, 'findByUserId').mockResolvedValueOnce(list);

      await controller.findAll(response, mockMovementQueryDto);
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toStrictEqual(jsonMovements);
    });

    it('should return 500 when userService fails', async () => {
      jest
        .spyOn(movementsService, 'findByUserId')
        .mockImplementationOnce(() => {
          throw TEST_ERR;
        });
      await expect(
        controller.findAll(response, mockMovementQueryDto),
      ).rejects.toThrow(TEST_ERR);
    });
  });
});
