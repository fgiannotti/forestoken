import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Accreditation } from '../entities/accreditation.entity';
import { AccreditationDto } from '../dtos/accreditation.dto';
import { AccreditationState } from '../entities/accreditationState.enum';

@Injectable()
export class AccreditationsService {
  constructor(
    @InjectRepository(Accreditation)
    private accreditationRepository: Repository<Accreditation>,
  ) {}

  findAllById(userId: number): Promise<Accreditation[]> {
    return this.accreditationRepository.findBy({ userId: userId });
  }

  async findOne(id: number): Promise<Accreditation> {
    return await this.accreditationRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.accreditationRepository.delete(id);
  }

  async create(accreditationDto: AccreditationDto): Promise<Accreditation> {
    // copy accreditationDto to user entity
    const accreditation = this.accreditationRepository.create(accreditationDto);
    return this.accreditationRepository.save(accreditation);
  }

  async findAllPendings(): Promise<Accreditation[]> {
    return this.accreditationRepository.findBy({
      state: AccreditationState.generated,
    });
  }

  async approve(id: number): Promise<Accreditation> {
    const accreditation = await this.accreditationRepository.findOneBy({
      id: id,
    });
    accreditation.state = AccreditationState.approved;
    return this.accreditationRepository.save(accreditation);
  }

  async reject(id: number): Promise<Accreditation> {
    const accreditation = await this.accreditationRepository.findOneBy({
      id: id,
    });
    accreditation.state = AccreditationState.rejected;
    return this.accreditationRepository.save(accreditation);
  }
}
