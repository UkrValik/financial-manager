import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate } from 'class-validator';

export class StatisticCategoryDto {
  @ApiProperty({ type: [Number] })
  @IsArray()
  categoryIdArray: number[];

  @ApiProperty()
  @IsDate()
  fromPeriod: Date;

  @ApiProperty()
  @IsDate()
  toPeriod: Date;
}
