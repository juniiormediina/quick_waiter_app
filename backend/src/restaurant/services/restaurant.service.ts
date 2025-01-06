import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Restaurant } from '../../database/model/restaurant.model';
import { Tables } from '../../database/model/tables.model';
import { RestaurantDto } from '../dto/restaurant.dto';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';
import { ExceptionService } from '../../shared/exception/exception.service';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant) private restaurantModel: typeof Restaurant,
    private readonly exceptionService: ExceptionService,
  ) {}

  async createRestaurant(restaurantData: RestaurantDto) {
    return this.restaurantModel.create({ ...restaurantData });
  }

  async findAllRestaurants() {
    return this.restaurantModel.findAll();
  }

  async findAllTablesByRestaurant(restaurantId: string) {
    return this.restaurantModel.findOne({
      rejectOnEmpty: undefined,
      where: { id: restaurantId },
      include: [Tables], // Incluye las mesas asociadas
    });
  }

  async updateRestaurant(id: string, updateData: UpdateRestaurantDto) {
    const restaurant = await this.restaurantModel.findByPk(id);

    if (!restaurant) {
      this.exceptionService.throwBadRequestException(
        `Restaurant with id ${id} not found`,
      );
    }

    return restaurant.update(updateData);
  }

  async deleteRestaurant(id: string): Promise<void> {
    const restaurant = await this.restaurantModel.findByPk(id);

    if (!restaurant) {
      this.exceptionService.throwBadRequestException(
        `Restaurant with id ${id} not found`,
      );
    }

    await restaurant.destroy();
  }
}
