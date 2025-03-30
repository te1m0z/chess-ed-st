import { User } from '../entities/user.entity'

// что должен уметь репозиторий юзера
export interface IUserRepository {
  findByLogin(login: string): Promise<User | null>
  create(login: string, password: string): Promise<User>
}
