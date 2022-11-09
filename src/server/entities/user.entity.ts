import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Movement } from './movement.entity';
import { ProducerType } from './producerType.enum';
import { TaxSubjectType } from './taxSubjectType.enum';
import { Wallet } from './wallet.entity';
import { Accreditation } from './accreditation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  mail: string;

  @Column()
  dni: string;

  @Column({
    type: 'enum',
    enum: ProducerType,
  })
  producerType: ProducerType;

  @Column()
  provincia: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  postalCode: string;

  @Column({
    type: 'enum',
    enum: TaxSubjectType,
  })
  taxSubjectType: TaxSubjectType;

  @Column({
    type: 'bit',
  })
  isPoliticPerson: boolean;

  @Column({
    type: 'bit',
  })
  isRegulatedPerson: boolean;

  @Column({
    type: 'bit',
    nullable: true,
  })
  isAdmin: boolean;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date;

  @Column()
  photoUrl: string;

  @OneToMany(() => Movement, (movement) => movement.userId)
  movements?: Movement[];

  // expose only the id
  @Column({
    type: 'varchar',
    nullable: true,
  })
  // This is the wallet Address
  @OneToOne(() => Wallet, (wallet) => wallet.userId)
  walletId: string;

  @OneToMany(() => Accreditation, (accreditation) => accreditation.userId)
  accreditations?: Accreditation[];
}
