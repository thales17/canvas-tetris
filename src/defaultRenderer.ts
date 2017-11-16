import Board from "./board";
import GridCell from "./gridCell";
import TetrisType from "./tetrisType";

class DefaultRenderer {
  private canvas: HTMLCanvasElement ;
  private ctx: CanvasRenderingContext2D;
  private blockSize: number;
  private typeColors: string[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.blockSize = 20;
    this.typeColors = [];
    this.typeColors[TetrisType.O] = "yellow";
    this.typeColors[TetrisType.I] = "cyan";
    this.typeColors[TetrisType.J] = "blue";
    this.typeColors[TetrisType.L] = "orange";
    this.typeColors[TetrisType.S] = "green";
    this.typeColors[TetrisType.T] = "purple";
    this.typeColors[TetrisType.Z] = "red";
  }

  public renderBoard(board: Board) {
    const xOffset: number = (this.canvas.width - (board.width * this.blockSize)) / 2;
    const yOffset: number = (this.canvas.height - (board.height * this.blockSize)) / 2;
    for (let r = 0; r < board.height; r++) {
      for (let c = 0; c < board.width; c++) {
        if (board.getGridCell(r, c)) {
          this.renderBlock(xOffset, yOffset, r, c, board.getGridCell(r, c));
        }
      }
    }
  }

  private renderBlock(xOffset: number, yOffset: number, row: number, col: number, gridCell: GridCell) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;

    this.ctx.fillStyle = this.typeColors[gridCell.tetrisType];
    this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
  }
}

export default DefaultRenderer;
