import { TransactionEntity } from 'src/transaction/models/transaction.entity';
import { TransactionI } from 'src/transaction/models/transaction.interface';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity('bank')
export class BankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float' })
  balance: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.bank)
  transactions: TransactionI[];
}
