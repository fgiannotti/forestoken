import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Affiliate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  account: string;

  @Column()
  link: string;
}
