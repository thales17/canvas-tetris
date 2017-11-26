import Board from "./board";
import Command from "./command";
import DefaultRenderer from "./defaultRenderer";
import GridCell from "./gridCell";
import IRenderer from "./irenderer";
import KeyboardInputHandler from "./keyboardInputHandler";
import MonochromeRenderer from "./monochromeRenderer";
import Tetrimino from "./tetrimino";
import TetrisType from "./tetrisType";

class Game {
  private canvas: HTMLCanvasElement;
  private renderer: IRenderer;
  private board: Board;
  private keyboardInputHandler: KeyboardInputHandler;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new DefaultRenderer(canvas);

    this.board = new Board();
    this.board.setTetrimino(Tetrimino.randomTetrimino());

    this.keyboardInputHandler = new KeyboardInputHandler();
    this.keyboardInputHandler.setCommandForKeyCode(32, new Command(() => {
      if (this.renderer instanceof DefaultRenderer) {
        this.renderer = new MonochromeRenderer(canvas);
      } else {
        this.renderer = new DefaultRenderer(canvas);
      }
    }));

    const render = () => {
      const commands = this.keyboardInputHandler.handleInput();
      for (const command of commands) {
        command.execute();
      }
      this.renderer.renderBoard(this.board);
      requestAnimationFrame(render);
    };

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
