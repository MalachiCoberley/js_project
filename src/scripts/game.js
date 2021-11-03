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
    this.gameTime = 0;
    this.score = 0;
    this.lives = document.getElementById("life-count");
    this.scoredisplay = document.getElementById("score-count");
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
    this.canvas.setAttribute("tabindex", 0);
    this.addListeners();
    this.createBall(this.ctx, 75, 50, this, 5, 1);
  };
  
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
    this.player.shot.draw(ctx);
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
    this.lives.innerHTML = this.player.lives;
    this.scoredisplay.innerHTML = this.score;
  };
  
  checkCollisions() { 
    for (let i = 0; i < this.balls.length; i++){
      this.balls[i].isCollidedWith();
    }
  }


}

export default Game;