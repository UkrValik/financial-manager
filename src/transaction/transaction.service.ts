import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { BankService } from '../bank/bank.service';
import { BankI } from '../bank/models/bank.interface';
import { WebhookService } from '../webhook/webhook.service';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionTypeEnum } from './enums';
import { TransactionEntity } from './models/transaction.entity';
import { TransactionI } from './models/transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private bankService: BankService,
    private webhookService: WebhookService,
  ) {}

  async create(transaction: TransactionDto): Promise<TransactionI> {
    const savedTransaction = await this.transactionRepository.save(transaction);

    let bank: BankI = await this.bankService.findOne(savedTransaction.bank.id);
    if (savedTransaction.type === TransactionTypeEnum.PROFITABLE) {
      bank.balance += savedTransaction.amount;
    } else {
      bank.balance -= savedTransaction.amount;
    }
    bank = await this.bankService.update(bank);
    savedTransaction.bank = bank;

    const webhookArray = await this.webhookService.getAll();
    webhookArray.forEach((webhook) => {
      axios.post(webhook.url, savedTransaction);
    });
    return savedTransaction;
  }

  async findAll(
    pageSize: number,
    pageNumber: number,
  ): Promise<{
    transactionCount: number;
    transactionArray: TransactionI[];
  }> {
    const transactionCount = await this.transactionRepository
      .createQueryBuilder('transaction')
      .getCount();
    const transactionArray = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.categories', 'category')
      .leftJoinAndSelect('transaction.bank', 'bank')
      .orderBy('transaction.id', 'ASC')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getMany();
    return { transactionCount, transactionArray };
  }

  async delete(transactionId: number): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
      relations: { bank: true },
    });
    await this.transactionRepository.delete({ id: transactionId });
    const bank = await this.bankService.findOne(transaction.bank.id);
    if (transaction.type === TransactionTypeEnum.PROFITABLE) {
      bank.balance -= transaction.amount;
    } else {
      bank.balance += transaction.amount;
    }
    await this.bankService.update(bank);
  }
}
