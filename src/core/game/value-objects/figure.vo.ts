import { GameColor } from '../config/color.enum'
import { GameFigureType } from '../config/figure.enum'

export class Figure {
  constructor(
    public readonly color: GameColor,
    public readonly type: GameFigureType
  ) {}

  toString() {
    return `${this.color}-${this.type}`
  }
}
