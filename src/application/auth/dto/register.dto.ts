import { IsString, MinLength, MaxLength } from 'class-validator'

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  login: string

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  password: string
}