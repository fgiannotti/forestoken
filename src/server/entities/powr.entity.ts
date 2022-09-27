import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PoWR {
  @PrimaryGeneratedColumn('increment')
  id: number;
  // use these to grab files and calculate hashes if you want to check the PoWR
  @Column()
  saleContractPath: string;
  @Column()
  depositCertPath: string;
  @Column()
  collectionRightsContractPath: string;
  //this should be a many to one, but I wanted to avoid more columns in movement
  @Column()
  walletId: string;

  @Column()
  createdAt: Date;
}
