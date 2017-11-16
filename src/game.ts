import Board from "./board";
import GridCell from "./gridCell";
import IRenderer from "./irenderer";
import Renderer from "./monochromeRenderer";
import TetrisType from "./tetrisType";

class Game {
  private canvas: HTMLCanvasElement;
  private renderer: IRenderer;
  private board: Board;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.board = new Board();
    const render = () => {
      // this.randomBoard();
      this.renderer.renderBoard(this.board);
      requestAnimationFrame(render);
    };
    this.randomBoard();
    render();
  }

  private randomBoard() {
    const typeArray = [
      TetrisType.O,
      TetrisType.I,
      TetrisType.J,
      TetrisType.L,
      TetrisType.S,
      TetrisType.Z,
      TetrisType.T,
    ];
    for (let c = 0; c < this.board.width; c++) {
      for (let r = 0; r < this.board.height; r++) {
        const randomType = typeArray[Math.floor(Math.random() * typeArray.length)];
        this.board.setGridCell(new GridCell(randomType), r, c);
      }
    }
  }
}

export default Game;
