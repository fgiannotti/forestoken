import { Injectable } from '@nestjs/common';
import { Affiliate } from '../entities/affiliate.entity';
import { randomUUID } from 'crypto';
import { AffiliateDto } from '../dtos/affiliate.dto';

@Injectable()
export class AffiliatesService {
  constructor() {
  }

  private affiliates: Map<string, Affiliate> = new Map()
    .set('901dea1a-54be-11ed-bdc3-0242ac120002', {
      id: '901dea1a-54be-11ed-bdc3-0242ac120002',
      name: 'Puma Energy',
      location: 'Av. La Plata 1614, C1250 CABA',
      account: 'comercio-forestoken@business.example.com',
    })
    .set('5034a4a0-58b2-11ed-9b6a-0242ac120002', {
      id: '5034a4a0-58b2-11ed-9b6a-0242ac120002',
      name: 'Rex',
      location: 'Rivadavia 6201, C1406 CABA',
      account: 'comercio-forestoken@business.example.com',
    })
    .set('5034ab58-58b2-11ed-9b6a-0242ac120002', {
      id: '5034ab58-58b2-11ed-9b6a-0242ac120002',
      name: 'Ferretería Del Sol',
      location: 'Av. Segurola 329, C1407 Buenos Aires',
      account: 'comercio-forestoken@business.example.com',
    });

  // Saves item generating uuid
  public create(item: AffiliateDto): Affiliate {
    const affiliate: Affiliate = {
      id: randomUUID(),
      name: item.name,
      location: item.location,
      account: item.account,
    };
    this.affiliates.set(affiliate.id, affiliate);
    return affiliate;
  }

  public findOne(id: string): Affiliate {
    return this.affiliates.get(id);
  }

  public findAll(): Affiliate[] {
    return Array.from(this.affiliates.values());
  }

}

