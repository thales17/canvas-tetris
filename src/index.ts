import Game from "./game";

// TODO:
// Refactor the renderer into an interface
// Create monochrome renderer
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const game = new Game(canvas);
