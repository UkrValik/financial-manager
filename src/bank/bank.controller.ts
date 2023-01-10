import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { BankDto } from './dto/bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { BankI } from './models/bank.interface';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private bankService: BankService) {}

  @Post()
  @ApiOkResponse({
    description: 'Successfully created bank',
    type: UpdateBankDto,
  })
  @ApiBadRequestResponse({
    description: 'Error during bank creation',
  })
  async create(@Body() bank: BankDto): Promise<BankI> {
    try {
      const createdBank = await this.bankService.create(bank);
      return createdBank;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Retrieve bank by id',
    type: UpdateBankDto,
  })
  @ApiBadRequestResponse({
    description: 'Error during fetching bank by id',
  })
  async findOne(@Param('id') bankId: number): Promise<BankI> {
    try {
      const bank = await this.bankService.findOne(bankId);
      return bank;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'Retrieve all banks',
    type: [UpdateBankDto],
  })
  @ApiBadRequestResponse({
    description: 'Error during fetching banks',
  })
  async findAll(): Promise<BankI[]> {
    try {
      const bankArray = await this.bankService.findAll();
      return bankArray;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Successfully deleted bank',
  })
  @ApiBadRequestResponse({
    description: 'Error during bank deleting',
  })
  async delete(@Param('id') bankId: number): Promise<void> {
    try {
      await this.bankService.delete(bankId);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @ApiOkResponse({
    description: 'Successfully updated bank',
    type: UpdateBankDto,
  })
  @ApiBadRequestResponse({
    description: 'Error during bank update',
  })
  async update(@Body() bank: UpdateBankDto): Promise<BankI> {
    try {
      const updatedBank = await this.bankService.update(bank);
      return updatedBank;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
