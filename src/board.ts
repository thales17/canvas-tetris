import GridCell from "./gridCell";
import Point from "./point";
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
      if (!this.isPointClear(point)) {
        return false;
      }
    }
    return true;
  }

  public absorbTetrimino() {
    if (!this.tetrimino) {
      return;
    }

    const points = this.tetrimino.currentPoints();
    for (const point of points) {
      const index = this.indexForRowCol(point.y, point.x);
      if (index > 0 && index < this.data.length) {
        this.data[index] = new GridCell(this.tetrimino.tetrisType);
      }
    }
  }

  public clearLines(): number {
    let clearCount: number = 0;
    for (let i: number = this.height - 1; i >= 0; i--) {
      for (let j: number = 0; j < this.width; j++) {
        const point: Point = new Point(j, i);
        if (this.isPointClear(point)) {
          break;
        }

        if (j === this.width - 1) {
          clearCount++;
          this.clearRow(i);
        }
      }
    }
    return 0;
  }

  private isPointClear(point: Point): boolean {
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

    return true;
  }

  private clearRow(row: number) {
    for (let j: number = 0; j < this.width; j++) {
      if (this.indexForRowCol(row, j)) {
        this.data[this.indexForRowCol(row, j)] = null;
      }
    }
  }

  private moveBlocksDownFrom(row: number) {
    console.log("Implment, moveBlocksdownFromRow");
  }
}

export default Board;
