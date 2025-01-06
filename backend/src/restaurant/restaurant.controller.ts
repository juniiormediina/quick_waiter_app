import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantDto } from './dto/restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  createRestaurant(@Body() createDto: RestaurantDto) {
    return this.restaurantService.createRestaurant(createDto);
  }

  @Get()
  findAllRestaurants() {
    return this.restaurantService.findAllRestaurants();
  }

  @Get(':restaurantId')
  findAllTablesByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.restaurantService.findAllTablesByRestaurant(restaurantId);
  }

  @Put(':restaurantId')
  async updateRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.updateRestaurant(
      restaurantId,
      updateRestaurantDto,
    );
  }

  @Delete(':restaurantId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRestaurant(@Param('restaurantId') restaurantId: string): Promise<void> {
    await this.restaurantService.deleteRestaurant(restaurantId);
  }
}
