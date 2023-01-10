import { ApiProperty } from '@nestjs/swagger';
import { TransactionTypeEnum } from '../enums';
import { UpdateBankDto } from 'src/bank/dto/update-bank.dto';
import { BankI } from 'src/bank/models/bank.interface';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { CategoryI } from 'src/category/models/category.interface';

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
