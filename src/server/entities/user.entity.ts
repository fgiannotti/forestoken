import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Movement } from './movement.entity';

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

  @OneToMany(() => Movement, (movement) => movement.userId)
  movements?: Movement[];
}
