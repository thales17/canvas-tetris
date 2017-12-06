import Game from "./game";

// TODO:
// Add fall function for tetrimino
// Add better definition to pieces in the default renderer
// Add UI

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const game = new Game(canvas);
