import Point from "./point";
import TetrisType from "./tetrisType";

class Tetrimino {
  public static randomTetrimino(): Tetrimino {
    return null;
  }

  private static pointsDataForTetrisType(): Point[][] {
    return null;
  }

  public tetrisType: TetrisType;
  public points: Point[][];
  private rotateIndex: number;
  private point: Point;

  constructor(tetrisType: TetrisType) {
    this.tetrisType = tetrisType;
  }

  public rotate() {
    console.log("Rotate");
  }

  public currentPoints(): Point[] {
    return null;
  }

}

export default Tetrimino;
