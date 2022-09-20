import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Movement } from './movement.entity';
import { Wallet } from './wallet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  mail: string;

  @OneToMany(() => Movement, (movement) => movement.userId)
  movements?: Movement[];

  // expose only the id
  @Column({
    type: 'varchar',
    nullable: true,
  })
  @OneToOne(() => Wallet, (wallet) => wallet.userId)
  walletId: string;
}
