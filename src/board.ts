import GridCell from "./gridCell";
import Point from "./Point";
import Tetrimino from "./tetrimino";

class Board {
  public width: number;
  public height: number;
  private data: GridCell[];
  private tetrimino: Tetrimino;
  constructor() {
    this.width = 10;
    this.height = 20;
    this.data = new Array<GridCell>(this.width * this.height);
  }

  public indexForRowCol(row: number, col: number): number {
    const index = row * this.width + col;
    if (index > (this.width * this.height)) {
      return -1;
    }

    return index;
  }

  public setGridCell(gridCell: GridCell, row: number, col: number) {
    const index = this.indexForRowCol(row, col);
    if (index === null || index === undefined) {
      return;
    }
    this.data[index] = gridCell;
  }

  public getGridCell(row: number, col: number): GridCell {
    if (this.tetrimino && this.tetrimino.checkRowCol(row, col)) {
      return new GridCell(this.tetrimino.tetrisType);
    }
    const index = this.indexForRowCol(row, col);
    if (index === null || index === undefined) {
      return;
    }
    return this.data[index];
  }

  public setTetrimino(tetrimino: Tetrimino) {
    this.tetrimino = tetrimino;
  }

  public getTetrimino(): Tetrimino {
    return this.tetrimino;
  }

  public arePointsClear(points: Point[]): boolean {
    for (const point of points) {
      if (point.x < 0 || point.x > (this.width - 1)) {
        return false;
      }
      if (point.y < 0 || point.y > (this.height - 1)) {
        return false;
      }

      const index = this.indexForRowCol(point.y, point.x);
      if (index === null || index === undefined) {
        return false;
      }
      if (this.data[index]) {
        return false;
      }
    }
    return true;
  }
}

export default Board;
