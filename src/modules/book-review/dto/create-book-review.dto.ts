import { IsNotEmpty, IsString, IsInt, Min, Max, MaxLength, MinLength, IsNumber } from 'class-validator';

export class CreateBookReviewDto {
  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  @MaxLength(1000, { message: 'Content must be at most 1000 characters long' }) 
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  bookId: string;
}
