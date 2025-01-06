import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tables } from '../../database/model/tables.model';
import { TableDto } from '../dto/table.dto';
import { UpdateTableDto } from '../dto/update-table.dto';
import { ExceptionService } from '../../shared/exception/exception.service';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Tables)
    private tablesModel: typeof Tables,
    private readonly exceptionService: ExceptionService,
  ) {}

  async createTableForRestaurant(restaurantId: string, tableData: TableDto) {
    return this.tablesModel.create({
      ...tableData,
      restaurantId, // Asocia la mesa al restaurante
    });
  }

  async findAllTables() {
    return this.tablesModel.findAll();
  }

  async updateTable(id: string, updateData: UpdateTableDto) {
    const table = await this.tablesModel.findByPk(id);

    if (!table) {
      this.exceptionService.throwBadRequestException(
        `Table with id ${id} not found`,
      );
    }

    return table.update(updateData);
  }

  async deleteTable(id: string): Promise<void> {
    const table = await this.tablesModel.findByPk(id);

    if (!table) {
      this.exceptionService.throwBadRequestException(
        `Table with id ${id} not found`,
      );
    }

    await table.destroy();
  }
}
