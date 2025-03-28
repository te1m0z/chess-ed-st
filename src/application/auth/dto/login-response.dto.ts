export interface LoginResponseDto {
  user: {
    id: number
    login: string
  }
  access_token: string
}
