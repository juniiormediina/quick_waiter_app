
import { Injectable } from '@nestjs/common';

@Injectable()
export class TableService {
  getTable() {
    return 'Table Service';
  }
}
