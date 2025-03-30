import { IsString, Length, Matches } from 'class-validator'

export class PlayMoveDto {
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-h][1-8]$/)
  from: string

  @IsString()
  @Length(2, 2)
  @Matches(/^[a-h][1-8]$/)
  to: string
}
