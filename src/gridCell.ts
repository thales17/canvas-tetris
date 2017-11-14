import TetrisType from "./tetrisType.js";

class GridCell {
  public tetrisType: TetrisType;
  constructor(type: TetrisType) {
    this.tetrisType = type;
  }
}

export default GridCell;
