import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Restaurant } from './restaurant.model';

@Table
export class Tables extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column
  name: string;

  @Column
  chairs: string;

  // Clave foránea que apunta a Restaurant
  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.UUID,
  })
  restaurantId: string;

  // Relación con Restaurant
  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;
}
