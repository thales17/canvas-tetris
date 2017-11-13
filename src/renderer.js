import Types from './types.js';

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.blockSize = 20;
    this.typeColors = {};
    this.typeColors[Types.O] = 'yellow';
    this.typeColors[Types.I] = 'cyan';
    this.typeColors[Types.J] = 'blue';
    this.typeColors[Types.L] = 'orange';
    this.typeColors[Types.S] = 'green';
    this.typeColors[Types.T] = 'purple';
    this.typeColors[Types.Z] = 'red';
  }

  renderBlock(row, col, gridCell) {
    const x = col * this.blockSize;
    const y = row * this.blockSize;
    this.ctx.fillStyle = this.typeColors[gridCell.type];
    this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
  }

  renderBoard(board) {
    for(var r = 0; r < board.height; r++) {
      for(var c = 0; c < board.width; c++) {
        if(board.getGridItem(r, c)) {
          this.renderBlock(r, c, board.getGridItem(r, c));
        }
      }
    }
  }
}

export default Renderer;