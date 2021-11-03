class Ball{
  constructor(ctx, x, y, game, stage, vel_mod){
    this.context = ctx;
    this.pos_x = x;
    this.pos_y = y;
    this.vel_x = 2 * vel_mod;
    this.vel_y = -5;
    this.stage = stage;
    this.radius = this.stage * 10;
    this.game = game;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.pos_x, this.pos_y, this.radius, 0, 2 * Math.PI);
    ctx.stroke(); 
    ctx.fillStyle = "yellow"; 
    ctx.fill();
  }

  updatePos(){
  // Bounces ball left or right if it would leave the play area
    if (this.pos_x > this.radius && this.pos_x < 800 - this.radius) {
      this.pos_x += this.vel_x;
    } else if (this.pos_x <= this.radius) {
      this.pos_x = this.radius + 1;
      this.vel_x = this.vel_x * -1;
    } else if (this.pos_x >= this.radius) {
      this.vel_x = this.vel_x * -1;
      this.pos_x = 799 - this.radius;
    }

  // Bounces ball up or down if it would leave the play area
    if (this.pos_y >= this.radius && this.pos_y < 500 - this.radius) {
      this.pos_y += this.vel_y;
    } else if (this.pos_y >= 500 - this.radius) {
      this.vel_y = this.vel_y * -1;
      this.pos_y = 499 - this.radius;
    } else if (this.pos_y < this.radius) {
      this.vel_y = this.vel_y * -1;
      this.pos_y = this.radius + 1;
    }
  }

  isCollidedWith() {
    let left = this.pos_x - this.radius;
    let right = this.pos_x + this.radius;
    let bottom = this.pos_y + this.radius;

    if ( this.game.player.shot.pos_x >= left && this.game.player.shot.pos_x <= right){
      if (bottom >= (510 - (this.game.player.shot.sizeCount * 9))) {
        this.game.player.shot.collided = true;
        this.split();
      }
    } else if (this.game.player.shot.pos_x + 10 >= left && this.game.player.shot.pos_x + 10 <= right) {
      if (bottom >= (510 - (this.game.player.shot.sizeCount * 9))) {
        this.game.player.shot.collided = true;
        this.split();
      }
    }
  };


  split() { if (this.stage !== 1) {
    this.game.createBall(this.context, this.pos_x - 20, this.pos_y, this.game, this.stage - 1, -1)
    this.game.createBall(this.context, this.pos_x + 20, this.pos_y, this.game, this.stage - 1, 1)
  }
  // find whatever ball was hit and remove it from the game board.
    this.game.balls = this.game.balls.filter(item => item !== this);
  }

}

export default Ball