//Declaring paddle size, width, position, color and movement

class Paddle {
  //Constructs paddle with various parameters for how long and tall it is, along with its starting position, as well as color
  constructor() {
    this.width = 120;
    this.height = 15;
    this.position = createVector((WIDTH - this.width) / 2, HEIGHT - this.height - 10);
    this.xvel = 8;
    this.color = color(61, 61, 61);
    this.score = 0;
  }
  //Actualy makes the paddle appear on the screen for the game
  draw() {
    strokeWeight(2);
    stroke(61);
    fill(this.color);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
  //Declares movement for the paddle for it to move across the screen
  update() {
    if (this.position.x > 10 && keyIsDown(LEFT_ARROW)) {
      this.position.x -= this.xvel;
    }
    if (this.position.x < width - this.width - 10 && keyIsDown(RIGHT_ARROW)) {
      this.position.x += this.xvel;
    }
  }
//Resets the paddle and score if game ends
  reset() {
    this.position = createVector((WIDTH - this.width) / 2, HEIGHT - this.height - 10);
    this.score = 0;
  }
}
