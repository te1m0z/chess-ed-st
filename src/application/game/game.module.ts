import { Module } from '@nestjs/common'
import { GameRepository } from '@/infrastructure/game/game.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import { GameController } from './game.controller'
import { GameService } from './game.service'

// задача модуля - управление игрой
@Module({
  controllers: [GameController],
  providers: [GameRepository, PrismaService, GameService]
})
export class GameModule {}
