import { IsOptional, IsString } from 'class-validator';

export class UpdateTableDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  chairs?: string;

  // Habilitar si deseamos poder cambiar el restaurant
  // @IsOptional()
  // @IsUUID()
  // restaurantId?: string;
}
