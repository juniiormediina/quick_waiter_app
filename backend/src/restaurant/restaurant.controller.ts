import { Controller, Get } from '@nestjs/common';
import { RestaurantsService } from './services/restaurats.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Get('create')
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }
}
