import { Module } from '@nestjs/common'
import { PrismaModule } from '@/infrastructure/prisma'
import { UserRepository } from '@/infrastructure/user'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
