import { ApiProperty } from '@nestjs/swagger';
import { TransactionTypeEnum } from '../enums';
import { UpdateBankDto } from '../../bank/dto/update-bank.dto';
import { BankI } from '../../bank/models/bank.interface';
import { UpdateCategoryDto } from '../../category/dto/update-category.dto';
import { CategoryI } from '../../category/models/category.interface';

export class TransactionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty({ enum: TransactionTypeEnum, enumName: 'Transaction type' })
  type: TransactionTypeEnum;

  @ApiProperty({ type: UpdateBankDto })
  bank: BankI;

  @ApiProperty({ type: [UpdateCategoryDto] })
  categories: CategoryI[];

  @ApiProperty({ type: Date })
  createdAt: Date;
}
