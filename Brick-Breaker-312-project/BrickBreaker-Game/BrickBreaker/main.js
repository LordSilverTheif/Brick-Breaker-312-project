//Declares needed variables for the game to work
const WIDTH = 800;
const HEIGHT = 600;
let ball;
let player;
let bricks = [];
let templives = 3;
let level = 1;
let EnableAi = false;
let AiMode = false;
let start = true;
let Debug = false;

//debug nodes used for testing to make sure specific things worked
//Fetches the required data from the website code based on their id's allowing them to be moddified as needed
const AiDisplayStatus = document.querySelector('#Ai')
const AiButton = document.querySelector('#AiStats')

//Debug creation tools used during the coding of the game when enabled
const ballPosition = document.querySelector('#position')
const ballSpeed = document.querySelector('#speed')
const Debug1 = document.querySelector('#debug1')
const Debug2 = document.querySelector('#debug2')

const Red = document.querySelector('RED')
const Green = document.querySelector('GREEN')
const Blue = document.querySelector('BLUE')

const button = document.createElement('button')
const pause = document.createElement('button')
const ColorChange = document.createElement('button')

//Creates the buttons with what they say, how they look and where they are positioned on the screen
button.innerText = 'Disabled'
button.id = 'AiStatus'
// button.style.fontSize = '25px'
// button.style.fontFamily = 'sans serif'
// button.style.position = 'absolute'
// button.style.top = '690px'
// button.style.left = '580px'
button.className = 'AiStats'

pause.innerText = 'Pause'
pause.id = 'GameStatus'
// pause.style.fontSize = '25px'
// pause.style.fontFamily = 'sans serif'
// pause.style.position = 'absolute'
// pause.style.top = '350px'
// pause.style.left = '1200px'
pause.className = 'Pause'

button.addEventListener('click', () =>{
  if(EnableAi == false){
    button.innerText = 'Enabled'
    AiDisplayStatus.innerHTML = 'Disable Ai mode?'
    EnableAi = true
    AiMode = true
  }else{
    button.innerText = 'Disabled'
    AiDisplayStatus.innerHTML = 'Enable Ai mode?'
    EnableAi = false
    AiMode = false
    
  }
  
})


pause.addEventListener('click', () =>{
  alert('The game has be paused. Once you close this it will continue')
})

document.body.appendChild(button)
document.body.appendChild(pause)


//Sets the game up to play with the canvas, the ball, player, and then bricks
function setup() {
  createCanvas(WIDTH, HEIGHT);
  ball = new Ball();
  player = new Paddle();
  generateBricksField();
}

//Draws all required figures like the background, player, balls, game info, bricks, lives
function draw() {
  background(220);

  player.draw();
  gameInfo();
  ball.draw();

  if (ball.lives > 0) {
    bricks.forEach((brick) => {
      brick.draw();
    });
    player.update();
    ball.update();
    ball.boundaries();
    if (ball.collision(player)) {
      ball.velocity.y = -ball.velocity.y;
      BallSpeed();
    }
    bricks.forEach((brick, index) => {
      if (ball.collision(brick)) {
        bricks.splice(index, 1);
        player.score += brick.scoreValue;
        ball.velocity.y = -ball.velocity.y;
      }
    })
  } else {
    if (templives > 0) {
      StartScreen();
    } else {
      gameOver();
    }
  }
  

  DebugMode(Debug)
  
  if(Debug == true){
    bspeed= ball.velocity.y
    ballPosition.innerHTML = 'x: '+ball.position.x+" y: "+ball.position.y;
    ballSpeed.innerHTML= 'Current speed: '+ bspeed;
  }else{

  }

  AiStatus(AiMode)

  if (bricks.length < 1) {
    generateBricksField();
    level++
  }
}

//Starts the game when the enter key is pressed
function keyPressed() {
  if (keyCode === ENTER && start == true) {
    ball.lives = ball.initialLives;
    templives = 0;
    player.reset();
    ball.reset();
    generateBricksField();
    start = false;
  }
}

//Displays the game info for the game, like the lives and score
function gameInfo() {
  textSize(24);
  noStroke();
  fill(61, 61, 61)
  text(`Score: ${player.score}`, WIDTH - 140, 35);
  text(`Level: ${level}`, WIDTH - 450, 35);
  text(`Lives: ${ball.lives}`, 15, 35);
}

//Generates each layer of bricks for the game with random colors for each set of 2 layers
function generateBricksField() {
  bricks = [];
  for (let i = 0; i < 10; i++) {
    randomColor = color(Math.floor((Math.random() * 155) + 100), Math.floor((Math.random() * 155) + 100), Math.floor((Math.random() * 155) + 100));
    for (let j = 0; j < 10; j++) {
      let brick = new Brick(80 * j, 20 * i + 50, randomColor);
      bricks.push(brick);
    }
  }
}

//Displays the game over screen when all lives are lost
function gameOver(){
  fill(155, 0, 0);
  text("This game has been sent to the Dead State!", (width-460)/2, height/3);
  text("Press 'enter' to restart the game", (width - 340) / 2, height / 2);
  start = true;
}

//Displays the starting screen when first launched
function StartScreen(){
  fill(155, 0, 0);
  text(`Lives: ${templives}`, 15, 35);
  text(`Score: ${player.score}`, WIDTH - 140, 35);
  text(`Level: ${level}`, WIDTH - 450, 35);
  text("Press 'enter' to start the game", (width - 340) / 2, height / 2);
}

//Moves the paddle to make it stay inline with the ball as it moves and gets faster, if not capped it will eventually not detect collision and go through the paddle and bricks
function AiStatus(AI){
  var on = AI
  if(on == true){
    player.position.x = ball.position.x - 60;
  }else if(on = false){

  }
}

//Caps the balls speed to make sure it cannot go faster then a certain velocity to make sure it is still playable without using the Ai mode
function BallSpeed(){
  if( Math.abs(ball.velocity.y) > 18 ||  Math.abs(ball.velocity.y) == 18){
    ball.velocity.y = 18;
  }else{
    ball.velocity.mult(1.1);
  }
}

function DebugMode(Debug){
  var enable = Debug
  if(enable == false){
    ballPosition.style.display ='none';
    ballSpeed.style.display ='none';
    Debug1.style.display ='none';
    Debug2.style.display ='none';
  }else{
    ballPosition.style.display ='block';
    ballSpeed.style.display ='block';
    Debug1.display ='block';
    Debug2.display ='block';
  }
}