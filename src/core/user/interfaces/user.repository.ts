import { User } from '../entities/user.entity'

// что должен уметь репозиторий (sqlite, mysql...) игрока
export interface IUserRepository {
  findByLogin(login: string): Promise<User | null>
  create(user: User): Promise<User>
}
