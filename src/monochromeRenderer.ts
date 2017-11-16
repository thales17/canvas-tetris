import Board from "./board";
import GridCell from "./gridCell";
import TetrisType from "./tetrisType";

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
    this.blockSize = 20;
    this.strokeWidth = 5;
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

  private renderTetrisTypeO(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;

    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
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

    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
  }
}

export default MonochromeRenderer;
