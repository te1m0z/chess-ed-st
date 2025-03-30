import { Figure } from './figure.entity'
import { Move } from './move.entity'
import { GameColor } from '../config/color.enum'
import { GameFigureType } from '../config/figure.enum'

export class Game {
  // игральная доска
  private board: Record<string, Figure | null> = {}
  // кто сейчас ходит
  private currentTurn: GameColor = GameColor.WHITE
  // закончена ли партия
  private isFinished = false
  // ID победителя
  private winnerId: number | null = null

  constructor(
    // ID игры
    public readonly id: string,
    // ID игрока за белых
    public readonly whitePlayerId: number,
    // ID игрока за черных
    public readonly blackPlayerId: number,
    // Ходы в игре
    private readonly moves: Move[] = []
  ) {
    this.initBoard()

    for (const move of this.moves) {
      this.applyMove(move)
    }
  }

  private initBoard() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8]

    for (const l of letters) {
      for (const n of numbers) {
        this.board[`${l}${n}`] = null
      }
    }

    const figuresMap: Record<string, GameFigureType> = {
      a: GameFigureType.ROOK,
      b: GameFigureType.KNIGHT,
      c: GameFigureType.BISHOP,
      d: GameFigureType.QUEEN,
      e: GameFigureType.KING,
      f: GameFigureType.BISHOP,
      g: GameFigureType.KNIGHT,
      h: GameFigureType.ROOK
    }

    // белые фигуры
    for (const letter in figuresMap) {
      this.board[`${letter}${1}`] = new Figure(GameColor.WHITE, figuresMap[letter])
    }

    // белые пешки
    for (const letter of letters) {
      this.board[`${letter}${2}`] = new Figure(GameColor.WHITE, GameFigureType.PAWN)
    }

    // черные фигуры
    for (const letter in figuresMap) {
      this.board[`${letter}${8}`] = new Figure(GameColor.BLACK, figuresMap[letter])
    }

    // черные пешки
    for (const letter of letters) {
      this.board[`${letter}${7}`] = new Figure(GameColor.BLACK, GameFigureType.PAWN)
    }
  }

  private getColorByPlayerId(playerId: number): GameColor {
    if (playerId === this.whitePlayerId) return GameColor.WHITE
    if (playerId === this.blackPlayerId) return GameColor.BLACK
    throw new Error('Игрок не участвует в игре')
  }

  public makeMove(move: Move): void {
    if (this.isFinished) {
      throw new Error('Игра завершена')
    }

    const color = this.getColorByPlayerId(move.playerId)

    if (color !== this.currentTurn) {
      throw new Error('Сейчас ход соперника')
    }

    const figure = this.board[move.from]

    if (!figure) {
      throw new Error('Нет фигуры по координате')
    }

    if (figure.color !== color) {
      throw new Error('Нельзя ходить чужой фигурой')
    }

    const destination = this.board[move.to]
    
    if (destination && destination.color === color) {
      throw new Error('Нельзя бить свою фигуру')
    }

    if (!this.isValidBasicMove(figure, move.from, move.to)) {
      throw new Error('Недопустимый ход (простая проверка)')
    }

    // Применить ход
    this.applyMove(move)
    // Добавить ход
    this.moves.push(move)

    // Проверка на конец
    const enemyKing = Object.values(this.board).find((p) => p?.type === GameFigureType.KING && p.color !== color)

    if (!enemyKing) {
      this.isFinished = true
      this.winnerId = move.playerId
    }

    this.currentTurn = color === GameColor.WHITE ? GameColor.BLACK : GameColor.WHITE
  }

  private applyMove(move: Move) {
    this.board[move.to] = this.board[move.from]
    this.board[move.from] = null
  }

  private isValidBasicMove(piece: Figure, from: string, to: string): boolean {
    const [fx, fy] = this.toXY(from)
    const [tx, ty] = this.toXY(to)
    const dx = Math.abs(tx - fx)
    const dy = Math.abs(ty - fy)

    switch (piece.type) {
      case GameFigureType.PAWN:
        return dx === 0 && dy === 1
      case GameFigureType.KNIGHT:
        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2)
      case GameFigureType.BISHOP:
        return dx === dy
      case GameFigureType.ROOK:
        return dx === 0 || dy === 0
      case GameFigureType.QUEEN:
        return dx === dy || dx === 0 || dy === 0
      case GameFigureType.KING:
        return dx <= 1 && dy <= 1
      default:
        return false
    }
  }

  private toXY(cell: string): [number, number] {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    return [files.indexOf(cell[0]), Number(cell[1])]
  }

  public getSnapshot() {
    return {
      id: this.id,
      board: this.board,
      turn: this.currentTurn,
      isFinished: this.isFinished,
      winnerId: this.winnerId,
      moves: this.moves
    }
  }
}
