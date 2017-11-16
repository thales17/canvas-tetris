import GridCell from "./gridCell";

class Board {
  public width: number;
  public height: number;
  private data: GridCell[];

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
    const index = this.indexForRowCol(row, col);
    if (index === null || index === undefined) {
      return;
    }

    return this.data[index];
  }
}

export default Board;
