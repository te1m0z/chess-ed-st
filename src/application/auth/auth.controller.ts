import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register({
      login: body.login,
      password: body.password
    })
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login({
      login: body.login,
      password: body.password
    })
  }

  @Post('update-access')
  updateAccess(@Body() body: LoginDto) {
    return this.authService.login({
      login: body.login,
      password: body.password
    })
  }
}
