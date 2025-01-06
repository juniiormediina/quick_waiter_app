import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TableService } from './services/table.service';
import { TableDto } from './dto/table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post(':restaurantId')
  createTableForRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Body() createDto: TableDto,
  ) {
    return this.tableService.createTableForRestaurant(restaurantId, createDto);
  }

  @Get()
  findAllTables() {
    return this.tableService.findAllTables();
  }

  @Put(':tableId')
  async updateTable(
    @Param('tableId') tableId: string,
    @Body() updateTableDto: UpdateTableDto,
  ) {
    return this.tableService.updateTable(tableId, updateTableDto);
  }

  @Delete(':tableId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTable(@Param('tableId') tableId: string): Promise<void> {
    await this.tableService.deleteTable(tableId);
  }
}
