import { IsString, MaxLength } from 'class-validator'

export class UpdateAccessDto {
  @IsString()
  @MaxLength(20)
  login: string
}