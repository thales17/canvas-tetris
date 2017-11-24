import GridCell from "./gridCell";
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
}

export default Board;
