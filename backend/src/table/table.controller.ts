import { Controller, Get } from '@nestjs/common';
import { TableService } from './services/table.service';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get('create')
  getTable() {
    return this.tableService.getTable();
  }
}
