import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './services/table.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
