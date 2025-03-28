import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { type JwtPayload } from '@/core/auth'

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  generateTokens(payload: JwtPayload) {
    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m'
    })

    const refreshToken = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d'
    })

    return { accessToken, refreshToken }
  }

  verifyAccessToken(token: string) {
    return this.jwt.verify(token, { secret: process.env.JWT_SECRET })
  }
}
