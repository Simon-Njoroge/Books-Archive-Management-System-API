import { IsNotEmpty, IsOptional, IsString, IsDateString, MinLength, MaxLength, max } from 'class-validator';

export class CreateAuthorDto {
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must be at most 100 characters long' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @MaxLength(1000, { message: 'Bio must be at most 1000 characters long' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;
}
