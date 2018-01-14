import Game from "./game";

// TODO:
// Line clear animation
// Add ghost piece (http://tetris.wikia.com/wiki/Ghost_piece)
// Add hold
// Add scoring
// Add levels
// Add sound
// Add UI
  // Updated renderers to use relative sizing and respond to window resize events
  // Add border to the board
  // Upcoming tetrimino (1-6)
  // Hold UI
  // Pause indicator
  // Level indicator
  // Game over indicator
// Renderer
  // Add NES renderer
  // Improve the default renderer

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const game = new Game(canvas);
