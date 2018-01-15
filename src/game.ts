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

enum GameState {
  Playing,
  WaitingForNextTetrimino,
  LineClear,
  GameOver,
}

class Game {
  private canvas: HTMLCanvasElement;
  private renderer: IRenderer;
  private tetrimino: Tetrimino;
  private board: Board;
  private player1InputHandler: KeyDownInputHandler;
  private uiKeyboardInputHandler: KeyClickInputHandler;
  private timerID: number;
  private state: GameState;
  private frameDelay: number;
  private paused: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.renderer = new DefaultRenderer(canvas);

    this.setupGame();

    /* Begin Input Handler Code */
    this.player1InputHandler = new KeyDownInputHandler();

    const playerKeys = {
      Down: 40, // Down Arrow
      Drop: 32, // Space
      Left: 37,  // Left Arrow
      Right: 39, // Right Arrow
      Rotate: 38, // Up Arrow
    };
    this.player1InputHandler.setCommandForKeyCode(
      playerKeys.Rotate,
      new Command(this.inputHandler(() => {
        this.rotateTetriminoIfClear();
      }),
    ));

    this.player1InputHandler.setCommandForKeyCode(
      playerKeys.Left,
      new Command(this.inputHandler(() => {
         this.moveTetriminoIfClear(new Point(-1, 0));
      }),
    ));

    this.player1InputHandler.setCommandForKeyCode(
      playerKeys.Right,
      new Command(this.inputHandler(() => {
        this.moveTetriminoIfClear(new Point(1, 0));
      }),
    ));

    this.player1InputHandler.setCommandForKeyCode(
      playerKeys.Down,
      new Command(this.inputHandler(() => {
        this.moveTetriminoIfClear(new Point(0, 1));
      }),
    ));

    this.player1InputHandler.setCommandForKeyCode(
      playerKeys.Drop,
      new Command(this.inputHandler(() => {
        this.dropTetrimino();
      }),
    ));

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
    /* END Input Handler Code */

    const render = () => {
      this.board.clearLines();
      this.handleInputs();
      this.renderer.renderBoard(this.board);
      requestAnimationFrame(render);
    };

    render();
  }

  private inputHandler(fn: () => void): () => void {
    return () => {
      if (this.state !== GameState.Playing || this.paused) {
        return;
      }
      fn();
    };
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
    this.state = GameState.Playing;
    this.paused = false;
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
