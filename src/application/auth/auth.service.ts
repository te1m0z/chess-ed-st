import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import type { LoginPayload, RegisterPayload } from '@/core/auth'
import { UserService } from '@/application/user'
import { AuthSuccessDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async register({ login, password }: RegisterPayload): Promise<AuthSuccessDto> {
    // пытаемся найти юзера по логину
    const user = await this.userService.findByLogin(login)

    if (user) throw new BadRequestException('User already exists')

    // создаём нового юзера
    const newUser = await this.userService.create(login, password)

    // генерируем токены
    const payload = { sub: newUser.id, login: newUser.login }
    const access_token = await this.jwtService.signAsync(payload)

    return {
      user: {
        id: newUser.id,
        login: newUser.login
      },
      access_token
    }
  }

  async login({ login, password }: LoginPayload): Promise<AuthSuccessDto> {
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

  async updateAccessToken() {
    
  }
}
