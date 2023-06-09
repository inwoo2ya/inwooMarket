import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ModificationProductDto {
  @IsString()
  name?: string;

  @IsNumber()
  price?: number;

  @IsNumber()
  count?: number;
}
