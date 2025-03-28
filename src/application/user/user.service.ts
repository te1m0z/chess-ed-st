import { Injectable } from '@nestjs/common'
import { type User } from '@/core/user'
import { UserRepository } from '@/infrastructure/user'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByLogin(login: string): Promise<User | null> {
    return this.userRepo.findByLogin(login)
  }
}
