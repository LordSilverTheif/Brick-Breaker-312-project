//Delcares the Bricks position for x and y as well as what color they are

class Brick {
  //Constructs the bricks given specific parameters
  constructor(xPos, yPos, color) {
    this.width = 80;
    this.height = 20;
    this.position = createVector(xPos, yPos);
    this.color = color;
    this.scoreValue = 10;
  }
  //Draws each Brick at their location as well as filling them with their own color
  draw() {
    strokeWeight(2);
    stroke(61);
    fill(this.color);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}
