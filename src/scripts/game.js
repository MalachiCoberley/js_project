import Player from "./player"
import Ball from "./balls"

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.player = new Player(ctx, this);
    this.balls = [];
    this.gameTime = 60;
    this.score = 0;
    this.level = 1;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
    this.canvas.setAttribute("tabindex", 0);
    this.addListeners();
    this.startLevel();
  };

  startLevel() {
    this.balls = [];
    for (let i = 0; i < this.level; i++) {
      this.createBall(this.ctx, 75 + (i * 100), 50, this, 5, 1);
    }
  }
  
  addListeners() {
    this.canvas.addEventListener("keydown", (e) => {
      this.player.controller(e);
    })
    this.canvas.addEventListener("keyup", (e) => {
      this.player.controller(e);
    })
  }

  createBall(ctx, x, y, game, stage, vel_mod) {
    this.balls.push(new Ball(ctx, x, y, game, stage, vel_mod));
  }

  addScore(scoreMod) {
    this.score += 100 - (scoreMod * 10);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    this.player.draw(ctx);
    if (this.balls.length > 0) {
      for (let i = 0; i < this.balls.length; i++){
        this.balls[i].draw(ctx);
      }
    }
    for (let i = 0; i < this.player.lives; i++) {
      this.player.drawLives(ctx, i)
    }
    this.player.shot.draw(ctx);
    ctx.font = '25px serif';
    ctx.fillStyle = "Black"
    ctx.fillText('Lives', 5, 20);
    ctx.fillText(`Score: ${this.score}`, 200, 20);
    ctx.fillText(`Level: ${this.level}`, 700, 20);
  };

  animate(time) {
    const timeDelta = time - this.lastTime;
  
    this.step(timeDelta);
    this.draw(this.ctx);
    this.lastTime = time;
  
    requestAnimationFrame(this.animate.bind(this));
  };

  step(delta) {
    this.player.updatePos();
    if (this.balls.length > 0) {
      for (let i = 0; i < this.balls.length; i++){
        this.balls[i].updatePos();
      }
    }
    if (this.player.shot.fired) {
      this.player.shot.updatePos();
    }
    this.checkCollisions();
    this.levelComplete();
    this.gameTime += 1
  };
  
  checkCollisions() { 
    for (let i = 0; i < this.balls.length; i++){
      this.balls[i].isCollidedWith();
    }
  }

  gameOver() {
    this.level = 1;
    this.player.lives = 3;
    this.score = 0;
    this.player.pos_x = 400;
    this.startLevel();
  }

  levelComplete() {
    if (this.balls.length === 0) {
      this.level += 1
      this.startLevel();
    }
  }


}

export default Game;