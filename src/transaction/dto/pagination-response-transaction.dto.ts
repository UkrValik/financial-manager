import { ApiProperty } from '@nestjs/swagger';
import { TransactionResponseDto } from './transaction-response.dto';

export class PaginationResponseTransaction {
  @ApiProperty()
  transactionsCount: number;

  @ApiProperty({ type: [TransactionResponseDto] })
  transactionArray: TransactionResponseDto[];
}
