import { IsNotEmpty, IsString, IsInt, IsBoolean, IsUUID, IsOptional, IsArray,MinLength,MaxLength } from 'class-validator';

export class CreateBookDto {
  @MinLength(2, { message: 'Title must be at least 2 characters long' })
  @MaxLength(200, { message: 'Title must be at most 200 characters long' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @MinLength(10, { message: 'Description must be at least 10 characters long' })  
  @MaxLength(2000, { message: 'Description must be at most 2000 characters long' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  publicationYear: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categoryIds?: string[];
}
