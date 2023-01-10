import { TransactionI } from 'src/transaction/models/transaction.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  transactions: TransactionI[];
}
