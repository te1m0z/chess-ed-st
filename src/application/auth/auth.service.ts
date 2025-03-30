import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
import type { LoginPayload, RegisterPayload } from '@/core/auth'
import { UserService } from '@/application/user'
import { UserCredentionalsDto } from './dto'
import type { JwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async register({ login, password }: RegisterPayload): Promise<UserCredentionalsDto> {
    // пытаемся найти юзера по логину
    const user = await this.userService.findByLogin(login)

    if (user) throw new BadRequestException('User already exists')

    const passwordHashed = await hash(password, 10)

    // создаём нового юзера
    const newUser = await this.userService.create(login, passwordHashed)

    // генерируем токен
    const payload: JwtPayload = { id: newUser.id, login: newUser.login }

    const access_token = await this.jwtService.signAsync(payload)

    return {
      user: {
        id: newUser.id,
        login: newUser.login
      },
      access_token
    }
  }

  async login({ login, password }: LoginPayload): Promise<UserCredentionalsDto> {
    // пытаемся найти юзера по логину
    const user = await this.userService.findByLogin(login)

    if (!user) throw new UnauthorizedException('Invalid credentials')

    // проверяем пароль
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials')

    const payload: JwtPayload = { id: user.id, login: user.login }

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
