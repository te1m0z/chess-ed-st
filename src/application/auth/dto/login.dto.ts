import { IsString, MaxLength } from 'class-validator'

export class LoginDto {
  @IsString()
  @MaxLength(20)
  login: string

  @IsString()
  @MaxLength(20)
  password: string
}