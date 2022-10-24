import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { PoWR } from './powr.entity';

@Entity()
export class Movement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Why 2 columns?
  // See https://typeorm.io/relations-faq#how-to-use-relation-id-without-joining-relation
  // also this https://stackoverflow.com/questions/59831159/typeorm-relationship-only-ids-instead-of-whole-instances
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.movements)
  @JoinColumn()
  // promise makes it a lazy property, only queried when accessed
  user: Promise<User>;

  @Column()
  description: string;

  @Column({ default: false })
  burned: boolean;

  @Column()
  amount: number;

  @Column()
  date: Date;

  //powr doesn't have a movementId column intentionally
  @OneToOne(() => PoWR)
  @JoinColumn()
  powrId: number;
}
