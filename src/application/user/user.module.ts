import { Module } from '@nestjs/common'
import { UserRepository } from '@/infrastructure/user/user.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

// задача модуля - управление юзером
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService]
})
export class UserModule {}
