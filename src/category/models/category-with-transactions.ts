import { TransactionI } from '../../transaction/models/transaction.interface';

export class CategoryWithTransactions {
  id: number;
  name: string;
  transactions: TransactionI[];
}
