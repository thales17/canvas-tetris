import Board from "./board";
import GridCell from "./gridCell";
import TetrisType from "./tetrisType";

class MonochromeRenderer {
  private canvas: HTMLCanvasElement ;
  private ctx: CanvasRenderingContext2D;
  private blockSize: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.blockSize = 20;
  }
}

export default MonochromeRenderer;
