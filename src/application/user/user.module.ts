import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '@/application/auth'
import { PrismaModule } from '@/infrastructure/prisma'
import { UserRepository } from '@/infrastructure/user'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { JwtService } from '@nestjs/jwt'

// задача модуля - управление юзером
@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService],
  exports: [UserService]
})
export class UserModule {}
