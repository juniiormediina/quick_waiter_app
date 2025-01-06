import { IsNotEmpty, IsString } from 'class-validator';

export class TableDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  chairs: string;
}
