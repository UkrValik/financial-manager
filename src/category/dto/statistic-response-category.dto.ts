import { ApiProperty } from '@nestjs/swagger';

export class StatisticResponseCategoryDto {
  @ApiProperty()
  categoryName: number;
}
