import { Injectable } from '@nestjs/common'
import { type IUserRepository } from '@/core/user/interfaces/user.repository'
import { User } from '@/core/user/entities/user.entity'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByLogin(login: string) {
    const user = await this.prisma.user.findUnique({ where: { login } })

    return user ? new User(user.id, user.login, user.password) : null
  }

  async create(login: string, password: string) {
    const created = await this.prisma.user.create({
      data: { login, password }
    })

    return new User(created.id, created.login, created.password)
  }
}
