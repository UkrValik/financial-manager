import { TransactionI } from '../../transaction/models/transaction.interface';

export interface BankI {
  id: number;
  name: string;
  balance: number;
  transactions: TransactionI[];
}
