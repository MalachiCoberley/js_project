class Powerup{
  constructor(ctx, game, pos_x, pos_y) {
    this.ctx = ctx
    this.game = game;
    this.pos_x = pos_x
    this.pos_y = pos_y
  }

  draw(ctx){
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.stroke(); 
    ctx.fillStyle = "black"; 
    ctx.fillRect(this.pos_x - 10, this.pos_y - 10, this.pos_x + 10, this.pos_y + 10);
  }

}

export default Powerup