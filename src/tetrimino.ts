import Point from "./point";
import TetrisType from "./tetrisType";

class Tetrimino {
  public static randomTetrimino(): Tetrimino {
    const tetrisTypes = [
      TetrisType.I,
      TetrisType.J,
      TetrisType.L,
      TetrisType.O,
      TetrisType.S,
      TetrisType.T,
      TetrisType.Z,
    ];
    return new Tetrimino(tetrisTypes[Math.floor(Math.random() * tetrisTypes.length)]);
  }

  private static pointsDataForTetrisType(tetrisType: TetrisType): Point[][] {
    let points: Point[][];
    switch (tetrisType) {
      case TetrisType.I:
        points = [
          [new Point(0, 0), new Point(1, 0), new Point (2, 0), new Point(3, 0)],
          [new Point(0, 0), new Point(0, 1), new Point (0, 2), new Point(0, 3)],
        ];
        break;
      case TetrisType.J:
        points = [
          [new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(2, 1)],
          [new Point(1, 0), new Point(1, 1), new Point(1, 2), new Point(0, 2)],
          [new Point(0, 0), new Point(0, 1), new Point(1, 1), new Point (2, 1)],
          [new Point(0, 0), new Point(0, 1), new Point(0, 2), new Point(1, 0)],
        ];
        break;
      case TetrisType.L:
        points = [
          [new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(0, 1)],
          [new Point(0, 0), new Point(1, 0), new Point(1, 1), new Point(1, 2)],
          [new Point(0, 1), new Point(1, 1), new Point(2, 1), new Point(2, 0)],
          [new Point(0, 0), new Point(0, 1), new Point(0, 2), new Point(1, 2)],
        ];
        break;
      case TetrisType.O:
        points = [
          [new Point(0, 0), new Point(1, 0), new Point(0, 1), new Point(1, 1)],
        ];
        break;
      case TetrisType.S:
        points = [
          [new Point(0, 1), new Point(1, 1), new Point(1, 0), new Point(2, 0)],
          [new Point(0, 0), new Point(0, 1), new Point(1, 1), new Point(1, 2)],
        ];
        break;
      case TetrisType.T:
        points = [
          [new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(1, 1)],
          [new Point(1, 0), new Point(1, 1), new Point(1, 2), new Point(0, 1)],
          [new Point(0, 1), new Point(1, 1), new Point(2, 1), new Point(1, 0)],
          [new Point(0, 0), new Point(0, 1), new Point(0, 2), new Point(1, 1)],
        ];
        break;
      case TetrisType.Z:
        points = [
          [new Point(0, 0), new Point(1, 0), new Point(1, 1), new Point(2, 1)],
          [new Point(0, 2), new Point(0, 1), new Point(1, 1), new Point(1, 0)],
        ];
        break;
    }
    return points;
  }

  public tetrisType: TetrisType;
  public points: Point[][];
  private rotateIndex: number;
  private point: Point;

  constructor(tetrisType: TetrisType) {
    this.tetrisType = tetrisType;
    this.points = Tetrimino.pointsDataForTetrisType(this.tetrisType);
    this.rotateIndex = 0;
    this.point = new Point(0, 0);
  }

  public rotate() {
    this.rotateIndex++;
    this.rotateIndex %= this.points.length;
  }

  public currentPoints(): Point[] {
    return this.points[this.rotateIndex].map((point: Point, index: number): Point => {
      return new Point(point.x + this.point.x, point.y + this.point.y);
    });
  }

  public checkRowCol(row: number, col: number): boolean {
    const currentPoints = this.currentPoints();
    for (const p of currentPoints) {
      if (p.x === col && p.y === row) {
        return true;
      }
    }

    return false;
  }

  public translatePointsBy(offset: Point): Point[] {
    return this.points[this.rotateIndex].map((point: Point, index: number): Point => {
      return new Point(point.x + this.point.x + offset.x, point.y + this.point.y + offset.y);
    });
  }

  public rotatePoints(): Point[] {
    let nextRotation = this.rotateIndex + 1;
    nextRotation %= this.points.length;
    return this.points[nextRotation].map((point: Point, index: number): Point => {
      return new Point(point.x + this.point.x, point.y + this.point.y);
    });
  }

  public moveBy(offset: Point) {
    this.point.x += offset.x;
    this.point.y += offset.y;
  }

}

export default Tetrimino;
