import { ApiProperty } from '@nestjs/swagger';

export class WebhookResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;
}
