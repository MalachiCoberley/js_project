import Shot from "./shot"

class Player {
  constructor(ctx, game) {
    this.lives = 3;
    this.pos_x = 400;
    this.pos_y = 420;
    this.vel_x = 0;
    this.vel_y = 0;
    this.ctx = ctx
    this.activeShots = 0;
    this.shot = new Shot(this.pos_x, this.pos_y, this.ctx, this);
    this.game = game;
    this.image = document.getElementById('player');
    this.lastHit = 100;
    this.frame = 0;
  }

  draw(ctx){
    if (this.frame > 100) {
      ctx.drawImage(this.image, 40, 80, 40, 80, this.pos_x, this.pos_y, 40, 80)
      this.frame = 0;
    } else if (this.frame > 50) {
      ctx.drawImage(this.image, 0, 0, 40, 80, this.pos_x, this.pos_y, 40, 80);
    } else if (this.frame <= 50) {
      ctx.drawImage(this.image, 40, 80, 40, 80, this.pos_x, this.pos_y, 40, 80);
    } else ctx.drawImage(this.image, 40, 80, 40, 80, this.pos_x, this.pos_y, 40, 80)
  }

  drawLives(ctx, i) {
    ctx.drawImage(this.image, 0, 0, 40, 40, 5 * (i * 6), 30, 30, 30);
  }

  controller(e){
    // triggers move commands on key press. Halts player movement when no key is being pressed.
    if (e.type === "keydown") {
      if (e.code === "KeyA" || e.code === "ArrowLeft") {
        this.moveLeft();
      }
      if (e.code === "KeyD" || e.code === "ArrowRight") {
        this.moveRight();
      }
      if (e.code === "Space") {
        this.fireShot();
        e.preventDefault();
      }
      if (e.code === "KeyP") {
        this.game.pause();
      }
    } else if (e.type === "keyup" && e.code !== "Space" ) {
      this.vel_x = 0;
    }
  }

  moveLeft(){ this.vel_x = -4;}
  
  moveRight(){this.vel_x = 4;}

  updatePos(){
    if (this.pos_x > 0 && this.pos_x < 760) {
      this.pos_x += this.vel_x;
    } else if (this.pos_x <= 0) {
      this.vel_x = 0;
      this.pos_x = 1;
    } else if (this.pos_x >= 760) {
      this.vel_x = 0;
      this.pos_x = 759;
    }
  }

  fireShot() {
    if (this.activeShots === 0) {
      this.activeShots = 1;
      this.shot.fire(this.pos_x);
    }
  }

  subtractLife(hitTime) {
    if (this.lives > 1) {
      this.lives -= 1
      this.lastHit = hitTime;                                                               
    } else {
      this.game.gameOver();
    }
  }

}

export default Player