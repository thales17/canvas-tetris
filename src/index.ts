import Game from "./game";

// TODO:
// Add restart key combo
// Add 5 move after the piece cannot move down, if there is input in the buffer, otherwise drop the next piece
// Add next tetris piece "tape", list of the next 5 random tetriminos
// Add scoring
// Add levels
// Add hold
// Add sound
// Add UI
  // Updated renderers to use relative sizing and respond to window resize events
  // Add border to the board
  // Upcoming tetrimino
  // Hold UI
  // Pause indicator
  // Level indicator
  // Game over indicator
// Renderer
  // Add NES renderer
  // Improve the default renderer

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const game = new Game(canvas);
