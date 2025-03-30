import { Injectable } from '@nestjs/common'
import { User } from '@/core/user/entities/user.entity'
import { UserRepository } from '@/infrastructure/user/user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByLogin(login: string): Promise<User | null> {
    return this.userRepo.findByLogin(login)
  }

  async create(login: string, password: string): Promise<User> {
    return this.userRepo.create(login, password)
  }
}
