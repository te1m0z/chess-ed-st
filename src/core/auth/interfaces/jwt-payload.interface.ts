export interface JwtPayload {
  // цель создания токена (вход с нуля или обновление)
  iss: 'login' | 'refresh'
  // идентификатор пользователя к которому относится токен
  sub: string
}
