import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthGuard } from '@/application/auth/guards/auth.guard'
import { GameService } from './game.service'
import { PlayMoveDto } from './dto/play-move.dto'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('start')
  @UseGuards(AuthGuard)
  async startGame(@Req() req: Request) {
    return this.gameService.createGame(req.user.id)
  }

  @Post(':gameId/move')
  @UseGuards(AuthGuard)
  async playMove(@Param('gameId') gameId: string, @Body() dto: PlayMoveDto, @Req() req: Request) {
    return this.gameService.playMove({
      gameId,
      userId: req.user.id,
      from: dto.from,
      to: dto.to
    })
  }
}
