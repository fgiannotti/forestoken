import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { AccreditationState } from './accreditationState.enum';

@Entity()
export class Accreditation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  userId: number;
  @ManyToOne(() => User, (user) => user.accreditations)
  @JoinColumn()
  // promise makes it a lazy property, only queried when accessed
  user: Promise<User>;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  typeOfWood: string;

  @Column()
  quantity: number;

  @Column()
  date: string;

  @Column()
  phone: string;

  @Column()
  pathSaleContract: string;

  @Column()
  pathDeposit: string;

  @Column()
  pathComercialContract: string;

  @Column({
    type: 'enum',
    enum: AccreditationState,
    default: AccreditationState.generated,
  })
  state: AccreditationState;
}
