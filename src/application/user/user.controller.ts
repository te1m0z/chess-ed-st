import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@/application/auth/guards/auth.guard'
// import { JwtPayload } from '@/application/auth/types'

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user
  }
}
