import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookDto } from './dto/webhook.dto';
import { WebhookEntity } from './models/webhook.entity';
import { WebhookI } from './models/webhook.interface';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(WebhookEntity)
    private webhookRepository: Repository<WebhookEntity>,
  ) {}

  async create(webhook: WebhookDto): Promise<WebhookI> {
    const savedWebhook = await this.webhookRepository.save(webhook);
    return savedWebhook;
  }

  async getAll(): Promise<WebhookI[]> {
    const webhookArray = await this.webhookRepository.find();
    return webhookArray;
  }

  async delete(webhookId: number): Promise<void> {
    await this.webhookRepository.delete({ id: webhookId });
  }
}
