import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  rating: string;
}
