import Game from "./scripts/game"

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = "800";
  canvas.height = "500";
  const game = new Game(canvas, ctx);
  game.start();
});
