import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantsService } from './services/restaurats.service';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantsService],
})
export class RestaurantModule {}
