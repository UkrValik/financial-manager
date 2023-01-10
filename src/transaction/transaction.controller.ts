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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationResponseTransaction } from './dto/pagination-response-transaction.dto';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionI } from './models/transaction.interface';

import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Successfully created new transaction',
    type: TransactionResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Error during transaction creation',
  })
  async create(@Body() transaction: TransactionDto): Promise<TransactionI> {
    try {
      const createdTransaction = await this.transactionService.create(
        transaction,
      );
      return createdTransaction;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':pageSize/:pageNumber')
  @ApiOkResponse({
    description: 'List of transactions',
    type: PaginationResponseTransaction,
  })
  @ApiBadRequestResponse({
    description: 'Error during transaction fetching',
  })
  async findAll(
    @Param('pageSize') pageSize: number,
    @Param('pageNumber') pageNumber: number,
  ): Promise<{
    transactionCount: number;
    transactionArray: TransactionI[];
  }> {
    try {
      const transactionResponse = await this.transactionService.findAll(
        pageSize,
        pageNumber,
      );
      return transactionResponse;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Successfully deleted transaction',
  })
  @ApiBadRequestResponse({
    description: 'Error during transaction deletion',
  })
  async delete(@Param('id') TransactionId: number): Promise<void> {
    try {
      await this.transactionService.delete(TransactionId);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
