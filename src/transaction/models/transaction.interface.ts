import { CategoryI } from 'src/category/models/category.interface';
import { BankI } from '../../bank/models/bank.interface';
import { TransactionTypeEnum } from '../enums';

export interface TransactionI {
  id: number;
  amount: number;
  type: TransactionTypeEnum;
  bank: BankI;
  categories: CategoryI[];
}
