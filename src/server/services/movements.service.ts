import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movement } from '../entities/movement.entity';
import { MovementDto } from '../dtos/movement.dto';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private movementsRepo: Repository<Movement>,
  ) {}

  findByUserId(userId: number): Promise<Movement[]> {
    return this.movementsRepo.find({ where: { userId: userId } });
  }

  findOne(id: number): Promise<Movement> {
    return this.movementsRepo.findOneBy({ id });
  }

  async create(movementDto: MovementDto): Promise<Movement> {
    const movement = this.movementsRepo.create(movementDto);
    return this.movementsRepo.save(movement);
  }
}
