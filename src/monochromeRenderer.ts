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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    const stroke: number = this.blockSize / 8;
    const specSize: number = (this.blockSize - (stroke * 2)) / 7;
    const drawSpec = (xPrime: number, yPrime: number) => {
      const xOffsetPrime = x + stroke;
      const yOffsetPrime = y + stroke;
      const specX = xOffsetPrime + (xPrime * specSize);
      const specY = yOffsetPrime + (yPrime * specSize);
      this.fillRect(dark, specX, specY, specSize, specSize);
    };
    this.fillRect(darkest, x, y, this.blockSize, this.blockSize);
    this.fillRect(light, x + stroke, y + stroke, this.blockSize - (stroke * 2), this.blockSize - (stroke * 2));

    const specs = [
      {x: 4, y: 0},
      {x: 1, y: 1},
      {x: 6, y: 1},
      {x: 0, y: 3},
      {x: 4, y: 3},
      {x: 6, y: 4},
      {x: 1, y: 5},
      {x: 4, y: 5},
    ];

    for (const spec of specs) {
      drawSpec(spec.x, spec.y);
    }

  }

  private renderTetrisTypeL(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;
    const stroke: number = this.blockSize / 8;

    this.fillRect(darkest, x, y, this.blockSize, this.blockSize);
    this.fillRect(dark, x + stroke, y + stroke, this.blockSize - (stroke * 2), this.blockSize - (stroke * 2));
  }

  private renderTetrisTypeJ(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;
    const stroke: number = this.blockSize / 8;

    this.fillRect(darkest, x, y, this.blockSize, this.blockSize);
    this.fillRect(light, x + stroke, y + stroke, this.blockSize - (stroke * 2), this.blockSize - (stroke * 2));

    this.fillRect(
      darkest,
      x + (stroke * 3),
      y + (stroke * 3),
      this.blockSize - (stroke * 6),
      this.blockSize - (stroke * 6),
    );
  }

  private renderTetrisTypeT(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;
    const stroke: number = this.blockSize / 8;

    this.fillRect(darkest, x, y, this.blockSize, this.blockSize);
    this.fillRect(light, x + stroke, y + stroke, this.blockSize - (stroke * 2), this.blockSize - (stroke * 2));
    // Top
    this.fillRect(
      lightest,
      x + (stroke * 2),
      y + (stroke * 2),
      this.blockSize - (stroke * 4),
      stroke,
    );
    // Left
    this.fillRect(
      lightest,
      x + (stroke * 2),
      y + (stroke * 2),
      stroke,
      this.blockSize - (stroke * 4),
    );
    // Right
    this.fillRect(
      darkest,
      x + (stroke * 2) + (this.blockSize - (stroke * 4)) - stroke,
      y + (stroke * 2) + stroke,
      stroke,
      this.blockSize - (stroke * 4) - stroke,
    );
    // Bottom
    this.fillRect(
      darkest,
      x + (stroke * 2) + stroke,
      y + (stroke * 2) + (this.blockSize  - (stroke * 4)) - stroke,
      this.blockSize - (stroke * 4) - stroke,
      stroke,
    );
  }

  private renderTetrisTypeZ(xOffset: number, yOffset: number, row: number, col: number) {
    const x: number = col * this.blockSize + xOffset;
    const y: number = row * this.blockSize + yOffset;
    const stroke: number = this.blockSize / 8;

    this.fillRect(darkest, x, y, this.blockSize, this.blockSize);
    this.fillRect(light, x + stroke, y + stroke, this.blockSize - (stroke * 2), this.blockSize - (stroke * 2));
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
