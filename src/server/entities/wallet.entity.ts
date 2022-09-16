import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Wallet {
  @PrimaryColumn()
  address: string;

  @Column()
  privateKey: string;

  @Column()
  @OneToOne(() => User, (user) => user.walletId)
  @JoinColumn()
  userId: string;
}
