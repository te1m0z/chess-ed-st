import { Injectable } from '@nestjs/common'
import { IGameRepository } from '@/core/game/interfaces/game.repository'
import { Game } from '@/core/game/entities/game.entity'
import { Move } from '@/core/game/value-objects/move.vo'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class GameRepository implements IGameRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Game | null> {
    const gameData = await this.prisma.game.findUnique({ where: { id }, include: { moves: true } })

    if (!gameData) return null

    const moves = gameData.moves.map((m) => new Move(m.from, m.to, m.player_id, m.created_at))

    return new Game(gameData.id, gameData.white_id, gameData.black_id, moves)
  }

  async save(game: Game): Promise<void> {
    const snapshot = game.getSnapshot()
    const exists = await this.prisma.game.findUnique({ where: { id: snapshot.id } })

    if (!exists) {
      await this.prisma.game.create({
        data: {
          id: snapshot.id,
          white_id: game.whitePlayerId,
          black_id: game.blackPlayerId,
          status: 'WAITING'
        }
      })
      return
    }

    const lastMove = snapshot.moves[snapshot.moves.length - 1]

    if (!lastMove) throw new Error('Game dont have move')

    await this.prisma.$transaction([
      this.prisma.move.create({
        data: {
          game_id: snapshot.id,
          from: lastMove.from,
          to: lastMove.to,
          player_id: lastMove.playerId
        }
      }),
      this.prisma.game.update({
        where: { id: snapshot.id },
        data: { status: snapshot.isFinished ? 'FINISHED' : 'IN_PROGRESS', winner_id: snapshot.winnerId }
      })
    ])
  }
}
