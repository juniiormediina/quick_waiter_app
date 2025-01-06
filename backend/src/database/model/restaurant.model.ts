import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Tables } from './tables.model';

@Table
export class Restaurant extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column
  name: string;

  @Column
  location: string;

  @Column
  rating: string;

  // Relación de uno a muchos con Tables
  @HasMany(() => Tables)
  tables: Tables[];
}
