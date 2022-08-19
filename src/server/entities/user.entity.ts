import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  walletId: string;

  @Column()
  name: string;

  @Column()
  mail: string;
}
