class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderBoard(board) {
    console.log('Soon I will be a real renderer', board);
  }
}

export default Renderer;