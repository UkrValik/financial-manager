/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BankService } from './bank.service';
import { BankDto } from './dto/bank.dto';
import { BankEntity } from './models/bank.entity';

const mockBankRepository = {
  save: () => {},
  findOne: () => {},
  find: () => {},
  delete: () => {},
  createQueryBuilder: () => mockBankRepository,
  innerJoin: () => mockBankRepository,
  where: () => mockBankRepository,
  getOne: () => {},
};

describe('BankService', () => {
  let service: BankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankService,
        {
          provide: getRepositoryToken(BankEntity),
          useValue: mockBankRepository,
        },
      ],
    }).compile();

    service = module.get<BankService>(BankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save valid bank', async () => {
    const bankDto: BankDto = {
      name: 'bank1',
      balance: 0,
    };
    const expectedResult = {
      id: 1,
      ...bankDto,
    };

    jest
      .spyOn(mockBankRepository, 'save')
      .mockImplementationOnce(() => expectedResult);

    const result = await service.create(bankDto);
    expect(result).toEqual(expectedResult);
  });

  it('should find bank by its id', async () => {
    const bankId = 1;
    const expectedResult = {
      id: 1,
      name: 'bank1',
      balance: 0,
    };

    jest
      .spyOn(mockBankRepository, 'findOne')
      .mockImplementationOnce(() => expectedResult);

    const result = await service.findOne(bankId);
    expect(result).toEqual(expectedResult);
  });

  it('should find all banks', async () => {
    const expectedResult = [];

    jest
      .spyOn(mockBankRepository, 'find')
      .mockImplementationOnce(() => expectedResult);

    const result = await service.findAll();
    expect(result).toEqual(expectedResult);
  });

  it('should delete bank without transactions', async () => {
    const bankId = 1;

    jest.spyOn(service, 'hasTransactions').mockResolvedValueOnce(false);

    await expect(service.delete(bankId)).resolves.not.toThrow();
  });

  it('shoud not delete bank with transactions', async () => {
    const bankId = 1;
    const expectedError = new Error('There are transactions in this bank.');

    jest.spyOn(service, 'hasTransactions').mockResolvedValueOnce(true);

    await expect(service.delete(bankId)).rejects.toThrow(expectedError);
  });

  it('should update bank', async () => {
    const bank = {
      id: 1,
      name: 'bank1',
      balance: 0,
    };

    jest.spyOn(mockBankRepository, 'save').mockImplementationOnce(() => bank);

    const result = await service.update(bank);
    expect(result).toEqual(bank);
  });

  it('should return true if bank has transactions', async () => {
    const bank = {
      id: 1,
      name: 'bank1',
      balance: 0,
    };

    jest.spyOn(mockBankRepository, 'getOne').mockImplementationOnce(() => bank);

    const result = await service.hasTransactions(bank.id);
    expect(result).toBe(true);
  });

  it('should return false if bank has no transactions', async () => {
    const bankId = 1;

    jest.spyOn(mockBankRepository, 'getOne').mockImplementationOnce(() => null);

    const result = await service.hasTransactions(bankId);
    expect(result).toBe(false);
  });
});
