import { Module } from '@nestjs/common'
import { UserModule } from '@/application/user'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

// задача модуля - поддержка сессии авторизации
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
