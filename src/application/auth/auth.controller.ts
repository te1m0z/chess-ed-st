import { Controller, Post, Body, HttpStatus, HttpCode, UseGuards, Get, Request } from '@nestjs/common'
import { AuthGuard } from '@/infrastructure/auth'
import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body.login, body.password)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login({
      login: body.login,
      password: body.password
    })
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
