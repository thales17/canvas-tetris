import Game from "./game";

// TODO:
// Create tetrinomno class for the individual pieces
// Updated the renderers to accept both the tretrinomno and the board for rendering

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const game = new Game(canvas);
