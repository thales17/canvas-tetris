import Board from "./board";
import Command from "./command";
import DefaultRenderer from "./defaultRenderer";
import GridCell from "./gridCell";
import IRenderer from "./irenderer";
import KeyboardInputHandler from "./keyboardInputHandler";
import MonochromeRenderer from "./monochromeRenderer";
import Point from "./point";
import Tetrimino from "./tetrimino";
import TetrisType from "./tetrisType";

class Game {
  private canvas: HTMLCanvasElement;
  private renderer: IRenderer;
  private tetrimino: Tetrimino;
  private board: Board;
  private keyboardInputHandler: KeyboardInputHandler;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.renderer = new DefaultRenderer(canvas);

    this.tetrimino = Tetrimino.randomTetrimino();

    this.board = new Board();
    this.board.setTetrimino(this.tetrimino);

    this.keyboardInputHandler = new KeyboardInputHandler();
    this.keyboardInputHandler.setCommandForKeyCode(32, new Command(() => {
      this.nextRenderer();
    }));
    // Up
    this.keyboardInputHandler.setCommandForKeyCode(38, new Command(() => {
      this.rotateTetriminoIfClear();
    }));
    // Left
    this.keyboardInputHandler.setCommandForKeyCode(37, new Command(() => {
      this.moveTetriminoIfClear(new Point(-1, 0));
    }));
    // Right
    this.keyboardInputHandler.setCommandForKeyCode(39, new Command(() => {
      this.moveTetriminoIfClear(new Point(1, 0));
    }));
    // Down
    this.keyboardInputHandler.setCommandForKeyCode(40, new Command(() => {
      this.moveTetriminoIfClear(new Point(0, 1));
    }));

    setInterval(() => {
      if (!this.moveTetriminoIfClear(new Point(0, 1))) {
        this.board.absorbTetrimino();
        this.tetrimino = Tetrimino.randomTetrimino();
        this.board.setTetrimino(this.tetrimino);
      }
    }, 500);

    const render = () => {
      this.handleInputs();
      this.renderer.renderBoard(this.board);
      requestAnimationFrame(render);
    };

    render();
  }

  private nextRenderer() {
    if (this.renderer instanceof DefaultRenderer) {
      this.renderer = new MonochromeRenderer(this.canvas);
    } else {
      this.renderer = new DefaultRenderer(this.canvas);
    }
  }

  private handleInputs() {
    const commands = this.keyboardInputHandler.handleInput();
    for (const command of commands) {
      command.execute();
    }
  }

  private rotateTetriminoIfClear(): boolean {
    const rotatePoints = this.tetrimino.rotatePoints();
    if (this.board.arePointsClear(rotatePoints)) {
      this.tetrimino.rotate();
      return true;
    }

    return false;
  }

  private moveTetriminoIfClear(offset: Point): boolean {
    const translatePoints = this.tetrimino.translatePointsBy(offset);
    if (this.board.arePointsClear(translatePoints)) {
      this.tetrimino.moveBy(offset);
      return true;
    }

    return false;
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
