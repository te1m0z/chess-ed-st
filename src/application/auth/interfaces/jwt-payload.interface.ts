export interface JwtPayload {
  id: number
  login: string
  iat?: number
  exp?: number
}
