//Creates how the ball moves, how the ball functions, it's color, and the speed it moves at
class Ball {
  //Declares what position the ball starts at, its color, lives, and its starting velocity
  constructor() {
    this.radius = 15;
    this.position = createVector(WIDTH / 2, height - 35);
    this.randomXVelocity = Math.floor(Math.random() * 10 - 5);
    this.velocity = createVector(this.randomXVelocity, 4);
    this.color = color(195, 168, 255);
    this.offset = 10;
    this.initialLives = 3;
    this.lives = 0;
  }
  //Draws the ball on the screen in order to play the game
  draw() {
    strokeWeight(2);
    stroke(51);
    fill(this.color);
    circle(this.position.x, this.position.y, this.radius);
  }
//Declares the boundiers for the ball to either bounce off of or consider a life lost
  boundaries() {
    if (this.position.x < this.radius || this.position.x > WIDTH - this.radius) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.y < this.radius) {
      this.velocity.y = -this.velocity.y;
    }
    if (this.position.y > HEIGHT + this.radius) {
      this.lives--;
      this.reset();
    }
  }

//Detects collision for when the ball hits either the walls, ceiling, bricks, or paddle
  collision(object) {
    if (this.position.x > object.position.x
      && this.position.x < object.position.x + object.width
      && this.position.y > object.position.y
      && this.position.y < object.position.y + object.height) {
      return true;
    }
    return false;
  }

//updates the balls position to make it move as smoothly as possible across the screen
  update() {
    this.position.x += this.velocity.x;
    this.position.y -= this.velocity.y;
  }

  //Resets the balls position, and velocity when the ball hits any boundaries or bricks
  reset() {
    this.randomXVelocity = Math.floor(Math.random() * 10 - 5);
    this.position = createVector(WIDTH / 2, height - 35);
    this.velocity = createVector(this.randomXVelocity, 5);
  }
}
