import Board from "./board";
import Command from "./command";
import DefaultRenderer from "./defaultRenderer";
import GridCell from "./gridCell";
import IRenderer from "./irenderer";
import KeyClickInputHandler from "./keyClickInputHandler";
import KeyDownInputHandler from "./keyDownInputHandler";
import MonochromeRenderer from "./monochromeRenderer";
import Point from "./point";
import Tetrimino from "./tetrimino";
import TetrisType from "./tetrisType";

class Game {
  private canvas: HTMLCanvasElement;
  private renderer: IRenderer;
  private tetrimino: Tetrimino;
  private board: Board;
  private player1InputHandler: KeyDownInputHandler;
  private uiKeyboardInputHandler: KeyClickInputHandler;
  private timerID: number;
  private paused: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.renderer = new DefaultRenderer(canvas);

    this.setupGame();

    this.player1InputHandler = new KeyDownInputHandler();
    // Up
    this.player1InputHandler.setCommandForKeyCode(38, new Command(() => {
      if (this.paused) {
        return;
      }
      this.rotateTetriminoIfClear();
    }));
    // Left
    this.player1InputHandler.setCommandForKeyCode(37, new Command(() => {
      if (this.paused) {
        return;
      }
      this.moveTetriminoIfClear(new Point(-1, 0));
    }));
    // Right
    this.player1InputHandler.setCommandForKeyCode(39, new Command(() => {
      if (this.paused) {
        return;
      }
      this.moveTetriminoIfClear(new Point(1, 0));
    }));
    // Down
    this.player1InputHandler.setCommandForKeyCode(40, new Command(() => {
      if (this.paused) {
        return;
      }
      this.moveTetriminoIfClear(new Point(0, 1));
    }));
    // Space
    this.player1InputHandler.setCommandForKeyCode(32, new Command(() => {
      if (this.paused) {
        return;
      }
      this.dropTetrimino();
    }));

    this.uiKeyboardInputHandler = new KeyClickInputHandler();
    // 1
    this.uiKeyboardInputHandler.setCommandForKeyCode(49, new Command(() => {
      if (!(this.renderer instanceof DefaultRenderer)) {
        this.renderer = new DefaultRenderer(this.canvas);
      }
    }));
    // 2
    this.uiKeyboardInputHandler.setCommandForKeyCode(50, new Command(() => {
      if (!(this.renderer instanceof MonochromeRenderer)) {
        this.renderer = new MonochromeRenderer(this.canvas);
      }
    }));

    // P
    this.uiKeyboardInputHandler.setCommandForKeyCode(80, new Command(() => {
      this.paused = !this.paused;
      if (this.paused) {
        console.log("Paused");
      } else {
        console.log("Unpaused");
      }
    }));

    // =
    this.uiKeyboardInputHandler.setCommandForKeyCode(187, new Command(() => {
      this.setupGame();
    }));

    const render = () => {
      this.board.clearLines();
      this.handleInputs();
      this.renderer.renderBoard(this.board);
      requestAnimationFrame(render);
    };

    render();
  }

  private nextTetrimino() {
    this.board.absorbTetrimino();
    this.tetrimino = Tetrimino.randomTetrimino();
    this.board.setTetrimino(this.tetrimino);
    if (!this.board.arePointsClear(this.tetrimino.currentPoints())) {
      clearInterval(this.timerID);
      console.log("Game over");
      this.setupGame();
    }
  }

  private handleInputs() {
    let commands: Command[];
    commands = this.uiKeyboardInputHandler.handleInput();
    commands = commands.concat(this.player1InputHandler.handleInput());
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

  private dropTetrimino() {
    const offset: Point = new Point(0, 1);
    while (this.board.arePointsClear(this.tetrimino.translatePointsBy(offset))) {
      offset.y++;
    }
    offset.y--;
    this.tetrimino.moveBy(offset);
    this.nextTetrimino();
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

  private setupGame() {
    this.tetrimino = Tetrimino.randomTetrimino();

    this.board = new Board();
    this.board.setTetrimino(this.tetrimino);

    clearInterval(this.timerID);
    this.timerID = setInterval(() => {
      if (this.paused) {
        return;
      }
      if (!this.moveTetriminoIfClear(new Point(0, 1))) {
        this.nextTetrimino();
      }
    }, 500);
  }
}

export default Game;
