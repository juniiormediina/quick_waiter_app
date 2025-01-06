import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantsService {
  getRestaurants() {
    return 'Restaurants Service';
  }
}
