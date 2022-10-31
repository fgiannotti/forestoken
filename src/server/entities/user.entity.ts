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

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  mail: string;

  @Column({ nullable: true })
  dni: string;

  @Column({
    type: 'enum',
    enum: ProducerType,
    nullable: true,
  })
  producerType: ProducerType;

  @Column({ nullable: true })
  provincia: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({
    type: 'enum',
    enum: TaxSubjectType,
    nullable: true,
  })
  taxSubjectType: TaxSubjectType;

  @Column({
    type: 'bit',
    nullable: true,
  })
  isPoliticPerson: boolean;

  @Column({
    type: 'bit',
    nullable: true,
  })
  isRegulatedPerson: boolean;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date;

  @Column({ nullable: true })
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

  @Column({
    type: 'varchar',
    nullable: true,
  })

  // This is the access Token for Google login
  @Column({ nullable: true })
  accessToken: string;
}
