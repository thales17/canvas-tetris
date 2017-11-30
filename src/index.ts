import Game from "./game";

// TODO:
// Add line detection to the game board
// Add game over detection
// Add fall function for tetrimino
// Add better definition to pieces in the default renderer
// Add UI

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const game = new Game(canvas);
