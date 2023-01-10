import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WebhookResponseDto } from './dto/webhook-response.dto';
import { WebhookDto } from './dto/webhook.dto';
import { WebhookI } from './models/webhook.interface';
import { WebhookService } from './webhook.service';

@ApiTags('Webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private webhookService: WebhookService) {}

  @Post()
  @ApiOkResponse({
    description: 'Successfully created webhook',
    type: WebhookResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Error creating webhook',
  })
  async create(@Body() webhook: WebhookDto): Promise<WebhookI> {
    try {
      const savedWebhook = await this.webhookService.create(webhook);
      return savedWebhook;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  @ApiOkResponse({
    description: 'Successfully retrieved webhooks',
    type: [WebhookResponseDto],
  })
  @ApiBadRequestResponse({
    description: 'Error retrieving webhooks',
  })
  async getAll(): Promise<WebhookI[]> {
    try {
      const webhookArray = await this.webhookService.getAll();
      return webhookArray;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':webhookId')
  @ApiOkResponse({
    description: 'Successfully deleted webhook',
  })
  @ApiBadRequestResponse({
    description: 'Error deleting webhook',
  })
  async delete(@Param('webhookId') webhookId: number): Promise<void> {
    try {
      await this.webhookService.delete(webhookId);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
