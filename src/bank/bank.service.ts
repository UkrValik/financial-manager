import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankDto } from './dto/bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { BankEntity } from './models/bank.entity';
import { BankI } from './models/bank.interface';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(BankEntity)
    private bankRepository: Repository<BankEntity>,
  ) {}

  async create(bank: BankDto): Promise<BankI> {
    const savedBank = await this.bankRepository.save(bank);
    return savedBank;
  }

  async findOne(bankId: number): Promise<BankI> {
    const bank = await this.bankRepository.findOne({ where: { id: bankId } });
    return bank;
  }

  async findAll(): Promise<BankI[]> {
    const bankArray = await this.bankRepository.find();
    return bankArray;
  }

  async delete(bankId: number): Promise<void> {
    if (await this.hasTransactions(bankId)) {
      throw new Error('There are transactions in this bank.');
    } else {
      await this.bankRepository.delete({ id: bankId });
    }
  }

  async update(bank: UpdateBankDto): Promise<BankI> {
    const updatedBank = await this.bankRepository.save(bank);
    return updatedBank;
  }

  async hasTransactions(bankId: number): Promise<boolean> {
    const bank = await this.bankRepository
      .createQueryBuilder('bank')
      .innerJoin('transaction', 'transaction', 'transaction.bankId = bank.id')
      .where('bank.id = :bankId', { bankId })
      .getOne();
    return !!bank;
  }
}
