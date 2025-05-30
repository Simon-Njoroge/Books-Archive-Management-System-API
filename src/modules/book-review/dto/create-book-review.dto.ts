import { IsNotEmpty, IsUUID, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateBookReviewDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  bookId: string;
}
