// Arrays for the X and Y positions of the Aliens
var sphereCoordsX = [0, 0, 0, 0, 0];
var sphereCoordsY = [0, 0, 0, 0, 0];

// Array for the laser
var laserBeamY = [];
var laserBeamX = [];

// Other variables
var sphereDia = 25, speed = 1, score = 0;
var end = false, shoot = false, bang = false; click = true;
var xPos = 600, yPos = 725; ySpeed = 2/3;
var laserSpeed = -5;
var blaster;
var screech;
var alien;
var spaceship;
var backdrop;
var earth;
var alieninvasion;


function preload(){
  blaster = loadSound("blastertrimmed.wav");
  alien = loadImage("alien.png");
  spaceship = loadImage("spaceship.png");
  screech = loadSound("screech.wav");
  backdrop = loadImage("space.jpg");
  earth = loadImage("startscreen.jpg");
  alieninvasion = loadImage("alieninvasion.jpg");
  

}

function setup() {
  // Create an area that is not the full screen DONE
  createCanvas(1200, 800);
imageMode(CENTER);

  // set the x position of each alien randomly
  for( var i = 0; i < 5; i++){
    sphereCoordsX[i] = random(20, width-20);
    // The variable width is the width of the Canvas
    // We would use height for the height of the Canvas
  }

  textSize(40);
  // Setting this for the size the score will be displayed at
}

function draw() {
  if(click){
    sleep(2000);
    start();
  } else {


    image(backdrop, 600, 400, 1200, 800);

  noStroke();
  drawSpheres();
  moveSpheres();
    moveLaser();
  drawShip();
    checkShoot();

   if (shoot){
     makeBullet();
//      checkShoot();

  }
  endCheck();
  if (end){
    image(alieninvasion, 600, 400, 1200, 800);
    fill(255,0,0);
    text ("Game Over", width/2 - 80, height/2);


    click = !click;

    //setTimeout(start, 1000);
  }

  // Write a line to Display the Score,
  // near the top, cenetered would be best DONE
  fill(255, 0, 0);
  text("Score", width/2 - 40, height/8);
  text(score, width/2 - 5, height/5.5);

}
}


function drawSpheres(){
  // Set the color of the Aliens
  fill(108, 196, 23);
imageMode(CENTER);
  // Draw each of the aliens,
  // you should use a loop here. DONE
  for(var i = 0; i < 5; i++) {
    image(alien, sphereCoordsX[i], sphereCoordsY[i], 20, 20);
  }
}

function moveSpheres(){
  // Move Spheres down the screen,
  // i.e. change sphereCoordsY DONE
  for(i = 0; i < 5; i++) {
    sphereCoordsY[i] += ySpeed * 1.5;
  }

}

function drawShip(){
  // Draw the ship so that it follows the mouse left to right
  // but stays the same distance from the botom of the screen DONE
  fill(255, 0, 0);
  imageMode(CENTER);
  image(spaceship, xPos, yPos, 40, 40);
  //triangle(xPos, yPos, xPos - 20, yPos + 35, xPos + 20, yPos + 35);
  if(keyIsDown(65)) {
    xPos -= 10;
  }
  if(keyIsDown(68)) {
    xPos += 10;
  }
  if(xPos < 20) {
    xPos = 20;
  }
  if(xPos > width - 20) {
    xPos = width - 20;
  }


}

function moveLaser(){

for(var i = 0; i < laserBeamY.length; i++){
    noStroke();
  	fill(255, 0, 0);

    ellipse(laserBeamX[i], laserBeamY[i], 5, 5);

  }

  for(var i = 0; i < laserBeamY.length; i++){
    laserBeamY[i] += laserSpeed;
    if(laserBeamY[i] < 0){
      laserBeamX.splice(i, 1);
      laserBeamY.splice(i, 1);

      i--;
      score--;
    }

}
}


function checkShoot(){

  for(var i = 0; i < laserBeamY.length; i++){
    for(var j = 0; j < 5; j++){
    if(laserBeamX[i] >= sphereCoordsX[j] - 20 &&
       laserBeamX[i] <= sphereCoordsX[j] + 20 &&
       laserBeamY[i] <= sphereCoordsY[j] + 20 &&
       laserBeamY[i] >= sphereCoordsY[j] - 20){
         screech.play();
     score += 2;

    sphereCoordsX[j] = random(20, width-20);
    sphereCoordsY[j] = 0;
      laserBeamX.splice(i, 1);
      laserBeamY.splice(i, 1);

      i--;

    }
    }
  }


  // Check to see if you hit
  // Use a loop to see if any of the aliens was hit.

  // Probably some sort of If like checking if your
  // padle hit your ball in last challenge.
  // If you hit, you should probably increase the score


}

function makeBullet(){
 strokeWeight(3);
  stroke(255,0,0);
  fill(255,0,0);
   laserBeamX.push(xPos);
  laserBeamY.push(yPos);
  shoot = false;
  strokeWeight(3);
}

function mousePressed(){
  if(mouseX >= width/2 - 100 && mouseX <= width/2 + 20 &&
     mouseY >= height/2 + 180 && mouseY <= height/2 + 240){
      click = !click;
    end = false;
    score = 0;
    for(var i = 0; i < 5; i++){
    sphereCoordsY[i] = 0;
    }
    }
  // shoot = true;
  print(mouseX+ ", " +mouseY);


}

function endCheck(){
  // Check to see if any of the Aliens made it past the ship
  // You'll probably need some sort of loop here DONE
  for(var i = 0; i < 5; i++){
  if(sphereCoordsY[i] >= height){
      end = true;
    }
  }
}

function keyTyped() {
  if (key === 'w') {
    shoot = true;
    blaster.play();
  }

}

function start(){
  image(earth, 600, 400, 1200, 800);
  fill(255, 0, 0);
  text("Star Destroyer", width/2 - 140, height/2 + 25);
  text("Play", width/2 - 40, height/2 + 200);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
