import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { Game } from '@/core/game/entities/game.entity'
import { Move } from '@/core/game/value-objects/move.vo'
import { GameRepository } from '@/infrastructure/game/game.repository'

@Injectable()
export class GameService {
  constructor(private readonly gameRepo: GameRepository) {}

  async createGame(playerId: number): Promise<{ gameId: string }> {
    const gameId = randomUUID()

    const newGame = new Game(
      gameId,
      playerId,
      playerId, // временно сам против себя
      []
    )

    await this.gameRepo.save(newGame)

    return { gameId }
  }

  async playMove({ gameId, userId, from, to }: { gameId: string; userId: number; from: string; to: string }) {
    const game = await this.gameRepo.findById(gameId)
    if (!game) throw new Error('Game not found')

    // Проверка, что пользователь участвует в партии
    if (userId !== game.whitePlayerId && userId !== game.blackPlayerId) {
      throw new Error('Вы не участвуете в этой партии')
    }

    // Проверка, что это именно его ход
    const currentColor = game.getSnapshot().turn
    const expectedPlayerId = currentColor === 'white' ? game.whitePlayerId : game.blackPlayerId

    if (userId !== expectedPlayerId) {
      throw new Error('Сейчас не ваш ход')
    }

    // Создаём и применяем ход
    const move = new Move(from, to, userId)
    game.makeMove(move)

    // Сохраняем изменения
    await this.gameRepo.save(game)

    return game.getSnapshot()
  }
}
