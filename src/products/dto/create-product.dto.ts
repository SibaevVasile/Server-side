import { IsString, IsNumber, IsIn, IsOptional, IsBoolean, Length, Min, Max } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 50, { message: 'Numele produsului trebuie să aibă între 3 și 50 de caractere.' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(10, { message: 'Prețul minim este 10 lei.' })
  @Max(500, { message: 'Prețul maxim este 500 lei.' })
  price: number;

  @IsIn(['pizza', 'pasta', 'drink', 'dessert'], { message: 'Categoria trebuie să fie una validă.' })
  category: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
