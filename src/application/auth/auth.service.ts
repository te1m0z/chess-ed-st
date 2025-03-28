import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import type { LoginPayload } from '@/core/auth'
import { UserService } from '@/application/user'
import { LoginResponseDto } from './dto'

@Injectable()
export class  AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(login: string, password: string) {
    return this.userService.findByLogin
  }

  async login({ login, password }: LoginPayload): Promise<LoginResponseDto> {
    // пытаемся найти юзера по логину
    const user = await this.userService.findByLogin(login)

    if (!user) throw new UnauthorizedException('Invalid credentials')

    // проверяем пароль
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials')

    const payload = { sub: user.id, login: user.login }

    const access_token = await this.jwtService.signAsync(payload)

    return {
      user: {
        id: user.id,
        login: user.login
      },
      access_token
    }
  }
}
