import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsUppercase, IsLowercase, IsNumber } from 'class-validator';

export class CreateUserDto {
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must be at most 50 characters long' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsUppercase()
  @IsLowercase()
  @IsNumber()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
