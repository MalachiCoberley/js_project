import Player from "./player"
import Ball from "./balls"
import Powerup from "./powerups"

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
    this.highScore = 0;
    this.paused = true;
    this.countOfBallsPopped = 0;
    this.activePowerups = []
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
    this.canvas.setAttribute("tabindex", 0);
    this.addListeners();
    this.startLevel();
  };

  pause() {
    if (this.paused) {
      this.paused = false;
    } else {
      this.paused = true;
    }
  }

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
    if (this.activePowerups.length > 0) {
      for (let i = 0; i < this.activePowerups.length; i++){
        this.activePowerups[i].draw(ctx);
      }
    }
    this.player.shot.draw(ctx);
    ctx.font = '25px sans-serif';
    ctx.fillStyle = "White"
    var gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    gradient.addColorStop("0", "red");
    gradient.addColorStop("0.5", "black");
    gradient.addColorStop("1.0", "yellow");
    ctx.fillStyle = gradient;
    ctx.fillText('Lives', 5, 20);
    ctx.fillText(`Level: ${this.level}`, 700, 20);
    ctx.fillText(`Score: ${this.score}`, 200, 20);
    ctx.fillText(`High Score: ${this.highScore}`, 400, 20);
  };

  animate(time) {
    const timeDelta = time - this.lastTime;
    if (!this.paused) {
      this.step(timeDelta);
      this.draw(this.ctx);
      this.lastTime = time;
    }
  
    requestAnimationFrame(this.animate.bind(this));
  };

  step(delta) {
    //TODO probably figure out why I'm not using a time delta for frame rate?
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
    this.checkHS();
    this.levelComplete();
    this.gameTime += 1;
    this.player.frame += 1;
  };

  checkHS() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
  }

  checkForPowerup(pos_x, pos_y) {
    // Past the limit, odds of dropping a powerup increase 
    const limit = 25
    let diceRoll;
    // Sometimes it spawns with a weirdly high balls-popped count
    if (this.countOfBallsPopped > 200) {
      this.countOfBallsPopped = 0;
    }
    if (this.countOfBallsPopped > limit) {
      diceRoll = this.randomIntFromInterval(1, 2)
      if (diceRoll === 2) {
        this.activePowerups.push(new Powerup(this.ctx, this.game, pos_x, pos_y))
        this.countOfBallsPopped = 0
        console.log("FORCEDPOWERUP", this.countOfBallsPopped)
      }
    } else {
      diceRoll = this.randomIntFromInterval(1, 20)
      if (diceRoll === 8) {
        this.activePowerups.push(new Powerup(this.ctx, this.game))
        console.log("POWER", this.countOfBallsPopped)
        this.countOfBallsPopped = 0
      }
    }
    return true;
  }
  
  checkCollisions() { 
    let currentBallPosX;
    let currentBallPosY;
    for (let i = 0; i < this.balls.length; i++){
      currentBallPosX = this.balls[i].pos_x;
      currentBallPosY = this.balls[i].pos_y;
      
      if(this.balls[i].isCollidedWith()) {
        console.log("I have been collided")
        this.countOfBallsPopped += 1
        this.checkForPowerup(currentBallPosX, currentBallPosY)
      }
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

  // TODO: util some shit for clarity
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


}

export default Game;