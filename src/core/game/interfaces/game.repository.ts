import { Game } from '../entities/game.entity'

// что должен уметь репозиторий игры
export interface IGameRepository {
  findById(id: string): Promise<Game | null>
  save(game: Game): Promise<void>
}
