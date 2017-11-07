import GridCell from './gridCell.js';
import Board from './board.js';
import Renderer from './renderer.js';
import Types from './types.js';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.board = new Board();
    this.render();
  }

  randomBoard() {
    const typeArray = [Types.O, Types.I, Types.J, Types.L, Types.S, Types.Z, Types.T];
    for(var c = 0; c < this.board.width; c++) {
      for(var r = 0; r < this.board.height; r++) {
        const randomType = typeArray[Math.floor(Math.random() * typeArray.length)];
        this.board.setGridItem(new GridCell(randomType), r, c);
      }
    }
  }

  render() {
    this.renderer.renderBoard(this.board);
    requestAnimationFrame(this.render);
  }
}

export default Game;



