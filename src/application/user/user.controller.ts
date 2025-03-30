import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@/application/auth/guards/auth.guard'
import { Request as ERequest } from 'express'

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req: ERequest) {
    return req.user
  }
}
