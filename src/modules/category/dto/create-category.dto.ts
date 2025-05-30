import { IsNotEmpty, IsOptional, IsString,MinLength,MaxLength, minLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must be at most 50 characters long' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @MaxLength(500, { message: 'Description must be at most 500 characters long' })
  @IsOptional()
  @IsString()
  description?: string;
}
