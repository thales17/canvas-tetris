import Board from "./board";
import GridCell from "./gridCell";
import TetrisType from "./tetrisType";

const darkest: string = "#0f380f";
const dark: string = "#306230";
const light: string = "#8bac0f";
const lightest: string = "#9bbc0f";

class MonochromeRenderer {
  private canvas: HTMLCanvasElement ;
  private ctx: CanvasRenderingContext2D;
  private blockSize: number;
  private strokeWidth: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.blockSize = this.canvas.height / 20;
  }

  public renderBoard(board: Board) {
    const xOffset: number = (this.canvas.width - (board.width * this.blockSize)) / 2;
    const yOffset: number = (this.canvas.height - (board.height * this.blockSize)) / 2;
    for (let r = 0; r < board.height; r++) {
      for (let c = 0; c < board.width; c++) {
        if (board.getGridCell(r, c)) {
          const gridCell = board.getGridCell(r, c);
          switch (gridCell.tetrisType) {
            case TetrisType.I:
              this.renderTetrisTypeI(xOffset, yOffset, r, c);
              break;
            case TetrisType.J:
              this.renderTetrisTypeJ(xOffset, yOffset, r, c);
              break;
            case TetrisType.L:
              this.renderTetrisTypeL(xOffset, yOffset, r, c);
              break;
            case TetrisType.O:
              this.renderTetrisTypeO(xOffset, yOffset, r, c);
              break;
            case TetrisType.S:
              this.renderTetrisTypeS(xOffset, yOffset, r, c);
              break;
            case TetrisType.T:
              this.renderTetrisTypeT(xOffset, yOffset, r, c);
              break;
            case TetrisType.Z:
              this.renderTetrisTypeZ(xOffset, yOffset, r, c);
              break;
          }
        }
      }
    }
  }
  private fillRect(color: string, x: number, y: number, w: number , h: number) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  private renderTetrisTypeO(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;

    const stroke: number = this.blockSize / 8;
    this.fillRect(darkest, x, y, this.blockSize, this.blockSize);
    this.fillRect(
      lightest,
      x + stroke,
      y + stroke,
      this.blockSize - (stroke * 2),
      this.blockSize - (stroke * 2),
    );
    this.fillRect(
      darkest,
      x + (stroke * 2),
      y + (stroke * 2),
      this.blockSize - (stroke * 4),
      this.blockSize - (stroke * 4),
    );
  }

  private renderTetrisTypeI(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;

    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
  }

  private renderTetrisTypeL(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;

    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
  }

  private renderTetrisTypeJ(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;

    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
  }

  private renderTetrisTypeT(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;

    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
  }

  private renderTetrisTypeZ(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;

    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
  }

  private renderTetrisTypeS(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;
    const stroke: number = this.blockSize / 8;

    this.fillRect(darkest, x, y, this.blockSize, this.blockSize);
    this.fillRect(dark, x + stroke, y + stroke, this.blockSize - (stroke * 2), this.blockSize - (stroke * 2));
    this.fillRect(
      darkest,
      x + (stroke * 2),
      y + (stroke * 2),
      this.blockSize - (stroke * 4),
      this.blockSize - (stroke * 4),
    );
    this.fillRect(
      lightest,
      x + (stroke * 3),
      y + (stroke * 3),
      this.blockSize - (stroke * 6),
      this.blockSize - (stroke * 6),
    );
  }
}

export default MonochromeRenderer;
