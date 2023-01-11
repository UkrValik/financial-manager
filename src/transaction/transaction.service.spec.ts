import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BankService } from '../bank/bank.service';
import { WebhookService } from '../webhook/webhook.service';
import { TransactionEntity } from './models/transaction.entity';
import { TransactionService } from './transaction.service';

const mockTransactionRepository = {};
const mockBankService = {};
const mockWebhookService = {};

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: BankService,
          useValue: mockBankService,
        },
        {
          provide: WebhookService,
          useValue: mockWebhookService,
        },
        {
          provide: getRepositoryToken(TransactionEntity),
          useValue: mockTransactionRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
