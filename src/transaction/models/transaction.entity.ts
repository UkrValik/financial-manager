import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BankEntity } from '../../bank/models/bank.entity';
import { BankI } from '../../bank/models/bank.interface';
import { CategoryEntity } from '../../category/models/category.entity';
import { CategoryI } from '../../category/models/category.interface';
import { TransactionTypeEnum } from '../enums';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'enum', enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @ManyToOne(() => BankEntity, (bank) => bank.transactions)
  bank: BankI;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryI[];

  @CreateDateColumn()
  createdAt: Date;
}
