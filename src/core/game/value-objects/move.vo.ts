export class Move {
  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly playerId: number,
    public readonly createdAt: Date = new Date()
  ) {}
}
