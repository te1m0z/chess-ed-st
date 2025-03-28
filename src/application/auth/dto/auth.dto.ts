import { IsString, MinLength, MaxLength } from 'class-validator'

export class LoginDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  login: string

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string
}

export class RegisterDto extends LoginDto {} 