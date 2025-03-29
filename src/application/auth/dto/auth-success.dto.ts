export class AuthSuccessDto {
  user: {
    id: number
    login: string
  }
  access_token: string
}
