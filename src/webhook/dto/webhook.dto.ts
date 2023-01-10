import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WebhookDto {
  @ApiProperty()
  @IsString()
  url: string;
}
