class Powerup{
  constructor(ctx, game, pos_x, pos_y) {
    this.ctx = ctx
    this.game = game;
    this.pos_x = pos_x
    this.pos_y = pos_y
    this.radius = 5
    this.fallSpeed = 5
    this.power = this.assignRandomPower()
  }

  assignRandomPower() {
    const powers = ["extraLife", "thornShield", "shotgunShot"]
    return powers[Math.floor(Math.random()*powers.length)];
  }

  draw(ctx){
    let x = this.pos_x - this.radius
    let y = this.pos_y - this.radius
    ctx.beginPath();
    ctx.fillStyle = "brown"
    ctx.lineJoin = 'miter';
    ctx.arc(this.pos_x, this.pos_y, this.radius, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fill();
  }

  // TODO: balls use a similar check for collision. could probably share logic and dry up.
  isCollidedWith(game) {
    let left = this.pos_x - this.radius;
    let right = this.pos_x + this.radius;
    let bottom = this.pos_y + this.radius

    if ( game.player.pos_x >= left - 40 && game.player.pos_x <= right && bottom >= 420){
      console.log(game.activePowerups)
        return true
      }
  }

  updatePos() {
    if (this.pos_y < 500 - this.radius) {
      this.pos_y += this.fallSpeed;
    } else if (this.pos_y > 500 - this.radius) {
      this.pos_y = 500 - this.radius;
    }
  }

}

export default Powerup