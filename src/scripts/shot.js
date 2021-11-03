class Shot{
  constructor(x, y, ctx, player) {
    this.pos_x = x;
    this.pos_y = y + 90;
    this.sizeCount = 0;
    this.player = player
    this.ctx = ctx
    this.fired = false;
    this.collided = false;
  }

  fire(pos_x){
    this.pos_x = pos_x + 15;
    this.fired = true
  }

  draw(ctx){
    ctx.beginPath();
//growth rate is determined by the sizeCount multiplied by a number
    ctx.rect(this.pos_x, this.pos_y, 10, -9 * this.sizeCount);
    ctx.stroke();
    ctx.fillStyle = "green"; 
    ctx.fill(); 
  }

  updatePos(){
    if (this.fired = true) {
//this.sizeCount is used to limit how long the shot lingers on screen
      if (this.sizeCount < 65) {
        this.sizeCount += 1;
      }
      if (this.sizeCount >= 65 || this.collided) {
        this.fired = false;
        this.sizeCount = 0;
        this.player.activeShots = 0;
        this.collided = false;
      }
    }
  }
  

}

export default Shot