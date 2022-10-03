class Powerup{
  constructor(ctx, game, pos_x, pos_y) {
    this.ctx = ctx
    this.game = game;
    this.pos_x = pos_x
    this.pos_y = pos_y
  }

  draw(ctx){
    let x = this.pos_x
    let y = this.pos_y
    ctx.beginPath();
    ctx.lineJoin = 'miter';
// Figure out how to move shape to location of ball
    ctx.arc(x + 120, y + 88, 35, 5.74, 3.66, false);
    ctx.bezierCurveTo(x + 100, y + 55, x + 122, y + 27.5, x + 120, y + 20);
    ctx.bezierCurveTo(x + 122, y + 27.5, x + 121, y + 31.5, x + 150, y + 70)
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

}

export default Powerup