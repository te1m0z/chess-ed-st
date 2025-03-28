export class User {
  constructor(
    public readonly id: number,
    public login: string,
    public password: string
  ) {}

  // метод получения только публичных данных
  toPublic() {
    return {
      id: this.id,
      login: this.login
    }
  }
}
