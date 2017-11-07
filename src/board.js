class Board {
  constructor() {
    this.width = 10;
    this.height = 20;
    this.data = new Array(this.width * this.height);
  }

  indexForRowCol(row, col) {
    const index = row * this.width + col;
    if(index > (this.width * this.height)) {
      return;
    }

    return index;
  }

  setGridItem(gridItem, row, col) {
    const index = this.indexForRowCol(row, col);
    if(!index) {
      return;
    }
    this.data[index] = gridItem;
  }

  getGridItem(row, col) {
    const index = this.indexForRowCol(row, col);
    if(!index) {
      return;
    }

    return this.data[index];
  }
}

export default Board;