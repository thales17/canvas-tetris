import Board from "./board";

interface IRenderer {
  renderBoard(board: Board): void;
}

export default IRenderer;
