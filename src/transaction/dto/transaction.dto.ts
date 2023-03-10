import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionTypeEnum } from '../enums';
import { UpdateBankDto } from '../../bank/dto/update-bank.dto';
import { BankI } from '../../bank/models/bank.interface';
import { UpdateCategoryDto } from '../../category/dto/update-category.dto';
import { CategoryI } from '../../category/models/category.interface';

export class TransactionDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: TransactionTypeEnum, enumName: 'Transaction type' })
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;

  @ApiProperty({ type: UpdateBankDto })
  @ValidateNested()
  @Type(() => UpdateBankDto)
  bank: BankI;

  @ApiProperty({ type: [UpdateCategoryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCategoryDto)
  categories: CategoryI[];
}
