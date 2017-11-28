import Game from "./game";

// TODO:
// Add check point function to the board.
// Implement move functions for the tetrimino
// Add gravity to the board
// Add line detection to the game board

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const game = new Game(canvas);
