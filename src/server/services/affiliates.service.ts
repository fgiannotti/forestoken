import { Injectable } from '@nestjs/common';
import { Affiliate } from '../entities/affiliate.entity';
import { randomUUID } from 'crypto';
import { AffiliateDto } from '../dtos/affiliate.dto';

@Injectable()
export class AffiliatesService {
  private affiliates: Map<string, Affiliate> = new Map()
    .set('901dea1a-54be-11ed-bdc3-0242ac120002', {
      id: '901dea1a-54be-11ed-bdc3-0242ac120002',
      name: 'Puma Energy',
      location: 'Av. La Plata 1614, C1250 CABA',
      account: 'comercio-forestoken@business.example.com',
      link: 'https://www.google.com/maps/place/Av.+La+Plata+1614+c1250,+C1250AAT+CABA/data=!4m2!3m1!1s0x95bccbac396f4951:0x92881bdc1ab1ed9a?sa=X&ved=2ahUKEwja0ur7qpD7AhURq5UCHRSpA8cQ8gF6BAgUEAE',
    })
    .set('5034a4a0-58b2-11ed-9b6a-0242ac120002', {
      id: '5034a4a0-58b2-11ed-9b6a-0242ac120002',
      name: 'Rex',
      location: 'Rivadavia 6201, C1406 CABA',
      account: 'comercio-forestoken@business.example.com',
      link: 'https://www.google.com/maps/place/Rivadavia+6201,+C1406GLF+CABA/@-34.6254588,-58.4564689,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcca24f8d6681f:0x733d201c0d9be9e4!8m2!3d-34.6254632!4d-58.4542802',
    })
    .set('5034ab58-58b2-11ed-9b6a-0242ac120002', {
      id: '5034ab58-58b2-11ed-9b6a-0242ac120002',
      name: 'Ferretería Del Sol',
      location: 'Av. Segurola 329, C1407 Buenos Aires',
      account: 'comercio-forestoken@business.example.com',
      link: 'https://www.google.com/maps/place/Av.+Segurola+329,+C1407ANE+CABA/data=!4m2!3m1!1s0x95bcc9be26c0130d:0x118b0e1cac76a03e?sa=X&ved=2ahUKEwjlzN2eq5D7AhUIjZUCHdx6CO0Q8gF6BAgUEAE',
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
