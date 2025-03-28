import { Injectable } from '@nestjs/common'
import { type IUserRepository, User } from '@/core/user'
import { PrismaService } from '../prisma'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByLogin(login: string) {
    const user = await this.prisma.user.findUnique({ where: { login } })

    return user ? new User(user.id, user.login, user.password) : null
  }

  async create(user: User) {
    const created = await this.prisma.user.create({
      data: {
        login: user.login,
        password: user.password
      }
    })

    return new User(created.id, created.login, created.password)
  }
}
