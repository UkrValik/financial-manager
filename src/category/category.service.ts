import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionTypeEnum } from 'src/transaction/enums';
import { TransactionI } from 'src/transaction/models/transaction.interface';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { StatisticCategoryDto } from './dto/statistic-category.dto';
import { StatisticResponseCategoryDto } from './dto/statistic-response-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './models/category.entity';
import { CategoryI } from './models/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(category: CategoryDto): Promise<CategoryI> {
    const savedCategory = await this.categoryRepository.save(category);
    return savedCategory;
  }

  async findOne(categoryId: number): Promise<CategoryI> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    return category;
  }

  async findAll(): Promise<CategoryI[]> {
    const categoryArray = await this.categoryRepository.find();
    return categoryArray;
  }

  async delete(categoryId: number): Promise<void> {
    if (await this.hasTransactions(categoryId)) {
      throw new Error('There are transactions with this category');
    } else {
      await this.categoryRepository.delete({ id: categoryId });
    }
  }

  async update(category: UpdateCategoryDto): Promise<CategoryI> {
    const updatedCategory = await this.categoryRepository.save(category);
    return updatedCategory;
  }

  async hasTransactions(categoryId: number): Promise<boolean> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .innerJoin(
        'transaction_categories_category',
        'transaction_categories_category',
        'transaction_categories_category.categoryId = category.id',
      )
      .where('category.id = :categoryId', { categoryId })
      .getOne();
    return !!category;
  }

  async findCategoryTransactionsForPeriod(
    categoryId: number,
    fromPeriod: Date,
    toPeriod: Date,
  ): Promise<TransactionI[]> {
    const categoryWithTransactions = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect(
        'transaction_categories_category',
        'transaction_categories_category',
        'transaction_categories_category.categoryId = category.id',
      )
      .leftJoinAndMapMany(
        'category.transactions',
        'transaction',
        'transaction',
        'transaction.id = transaction_categories_category.transactionId',
      )
      .where('category.id = :categoryId', { categoryId })
      .andWhere('transaction.createdAt > :fromPeriod', { fromPeriod })
      .andWhere('transaction.createdAt < :toPeriod', { toPeriod })
      .getOne();
    return categoryWithTransactions?.transactions || [];
  }

  async getStatistic(
    statisticCategoryDto: StatisticCategoryDto,
  ): Promise<StatisticResponseCategoryDto[]> {
    const { categoryIdArray, fromPeriod, toPeriod } = statisticCategoryDto;
    const categoryBalanceArray = [];
    for (const categoryId of categoryIdArray) {
      const category = await this.findOne(categoryId);
      if (!category) continue;
      const categoryTransactionArray =
        await this.findCategoryTransactionsForPeriod(
          categoryId,
          fromPeriod,
          toPeriod,
        );
      const categoryBalanceValue = categoryTransactionArray.reduce(
        (sum, transaction) => {
          if (transaction.type === TransactionTypeEnum.PROFITABLE) {
            sum.amount += transaction.amount;
          } else {
            sum.amount -= transaction.amount;
          }
          return sum;
        },
        { amount: 0 },
      );
      const categoryBalance = {};
      categoryBalance[category.name] = categoryBalanceValue.amount;
      categoryBalanceArray.push(categoryBalance);
    }
    return categoryBalanceArray;
  }
}
