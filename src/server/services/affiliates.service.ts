import { Injectable } from '@nestjs/common';
import { Affiliate } from '../entities/affiliate.entity';
import { randomUUID } from 'crypto';
import { AffiliateDto } from '../controllers/affiliates.controller';

@Injectable()
export class AffiliatesService {
  constructor() {}
  private affiliates: Map<string, Affiliate> = new Map()
    .set('901dea1a-54be-11ed-bdc3-0242ac120002',{ id: '901dea1a-54be-11ed-bdc3-0242ac120002', name: 'Puma Energy', location: 'Av. La Plata 1614, C1250 CABA' });

  // Saves item generating uuid
  public create(item: AffiliateDto): Affiliate {
    const affiliate: Affiliate = {
      id: randomUUID(),
      name: item.name,
      location: item.location,
    }
    this.affiliates.set(affiliate.id, affiliate);
    return affiliate;
  }

  // Saves item assuming it has an id
  public save(item: Affiliate): Affiliate {
    this.affiliates.set(item.id, item);
    return item;
  }

  public delete(id: string): boolean {
    return this.affiliates.delete(id);
  }

  public findOne(id: string): Affiliate {
    return this.affiliates.get(id);
  }

  public findAll(): Affiliate[] {
    return Array.from(this.affiliates.values());
  }

}

