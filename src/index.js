import Game from "./scripts/game"

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = "800";
  canvas.height = "500";
  const game = new Game(canvas, ctx);
  game.start();
  ctx.font = '25px sans-serif';
  var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "black");
  gradient.addColorStop("0.5", "green");
  gradient.addColorStop("1.0", "black");
  ctx.fillStyle = gradient;
  ctx.fillText('Help protect Jessie\'s Garden!', 100, 200);
  ctx.fillText('A/D or Arrows to move, Space to attack', 110, 230);
  ctx.fillText('Press P to play', 120, 260);
});
