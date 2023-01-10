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
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { StatisticCategoryDto } from './dto/statistic-category.dto';
import { StatisticResponseCategoryDto } from './dto/statistic-response-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryI } from './models/category.interface';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @ApiOkResponse({
    description: 'Successfully created category',
    type: UpdateCategoryDto,
  })
  @ApiBadRequestResponse({
    description: 'Error during category creation',
  })
  async create(@Body() category: CategoryDto): Promise<CategoryI> {
    try {
      const createdCategory = await this.categoryService.create(category);
      return createdCategory;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Retrieve category',
    type: UpdateCategoryDto,
  })
  @ApiBadRequestResponse({
    description: 'Error during fetching category',
  })
  async findOne(@Param('id') CategoryId: number): Promise<CategoryI> {
    try {
      const category = await this.categoryService.findOne(CategoryId);
      return category;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all categories',
    type: [UpdateCategoryDto],
  })
  @ApiBadRequestResponse({
    description: 'Error during fetching categories',
  })
  async findAll(): Promise<CategoryI[]> {
    try {
      const categoryArray = await this.categoryService.findAll();
      return categoryArray;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Successfully deleted category',
  })
  @ApiBadRequestResponse({
    description: 'Error deleting category',
  })
  async delete(@Param('id') CategoryId: number): Promise<void> {
    try {
      await this.categoryService.delete(CategoryId);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @ApiOkResponse({
    description: 'Successfully updated category',
    type: UpdateCategoryDto,
  })
  @ApiBadRequestResponse({
    description: 'Error updating category',
  })
  async update(@Body() category: UpdateCategoryDto): Promise<CategoryI> {
    try {
      const updatedCategory = await this.categoryService.update(category);
      return updatedCategory;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('statistic')
  @ApiOkResponse({
    description: 'Successfully retrieved category statistc',
    type: [StatisticResponseCategoryDto],
  })
  @ApiBadRequestResponse({
    description: 'Error retrieving statistic for categories',
  })
  async getStatistic(
    @Body() statisticCategoryDto: StatisticCategoryDto,
  ): Promise<StatisticResponseCategoryDto[]> {
    try {
      const categoryBalanceArray = await this.categoryService.getStatistic(
        statisticCategoryDto,
      );
      return categoryBalanceArray;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
