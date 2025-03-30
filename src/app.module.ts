import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from '@/application/auth/auth.module'
import { UserModule } from '@/application/user/user.module'
import { GameModule } from '@/application/game/game.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10m' }
      })
    }),
    AuthModule,
    UserModule,
    GameModule
  ]
})
export class AppModule {}
