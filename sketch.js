// Bison variables
let bison;
let xPos = 300;
let yPos = -20;
let appa;

// Pipe variables
let pipe = [];
let xPosition = 1200;
let yPosition = 0;
let tree;

// End conditions
let end = false;

// Score variables
let score = 0;

// Start variables
let click = true;

// Background variables
let begin;
let chase;

// Music variables
let appagrowl;
let appajump;

function preload(){
  appa = loadImage("bison flying.png");
  tree = loadImage("treepillar.png");
  begin = loadImage("forestpic.jpg");
  chase = loadImage("forestchase.jpg");
  appagrowl = loadSound("Appagrowl.wav");
  appajump = loadSound("appajump.wav");

}


// Create Bison object
class Bird{
  constructor(){
    this.x = xPos;
    this.y = yPos;
    this.r = 50;
    this.ySpeed = 0;
  }

// Draw bison
  makeBison(){
    noStroke();
    fill(255);
    imageMode(CENTER);
    image(appa, this.x, this.y, this.r, this.r);
  }

  // Bison falls if mouse not clicked
  moveBison(){
    this.y += this.ySpeed;
    this.ySpeed += .2;

  }
}

// Create pipe objects
class Barrier{
  constructor(){
    this.x = xPosition;
    this.y = yPosition;
    this.xVelocity = -4;
    this.width = 100;
    this.length = random(50, 550);
    this.y2 = this.length + 200;
    this.length2 = 800 - this.length;
  }

  // Make pipe
  makePipe(){
    noStroke();
    fill(0);
    imageMode(CORNER);
    image(tree, this.x, this.y, this.width, this.length);
    image(tree, this.x, this.y2, this.width, this.length2);
  }

  // Move pipe
  movePipe(){
    this.x += this.xVelocity;
    this.xVelocity += -.005;
  }



}


function setup(){
  createCanvas(1200, 800);
  bison = new Bird();
  pipe.push(new Barrier);
  textSize(35);

}


function draw(){
  if(click){
    // Start conditions and beginning background
    imageMode(CENTER);
    image(begin, 600, 400, 1200, 800);
    sleep(2000);
    start();
  } else {
  // Set background for during the game
  imageMode(CENTER);
  image(chase, 600, 400, 1200, 800);

  // Basic bison movement
  bison.makeBison();
  bison.moveBison();
   if(bison.y >= height - 10){
     bison.y = height - 10;
   }

   // Basic pipe values
   for(let i = 0; i < pipe.length; i++){
     pipe[i].makePipe();
     pipe[i].movePipe();
     // Create new pipe every 200 "units"
     if(pipe[i].x == 797.675){
       pipe.push(new Barrier);

     }

     // Delete old pipe if it goes offscreen
     if(pipe[i].x == -104.51499999999652){
       pipe.splice(i, 1);
       i--;
     }
   }

   // Check to see if the bison touches the Pipe or ground
   for(let i = 0; i < pipe.length; i++){
     if(pipe[i].x <= bison.x  && pipe[i].x + 100 >= bison.x &&
        pipe[i].y <= bison.y && pipe[i].y + pipe[i].length >= bison.y ||
        pipe[i].y2 <= bison.y  && pipe[i].y2 + pipe[i].length2 >= bison.y &&
        pipe[i].x <= bison.x  && pipe[i].x + 100 >= bison.x ||
        bison.y >= height - 10){
       end = true;
       click = true;
     }
   }


    // End conditions
    if(end){
      appagrowl.play();
      fill(255,0,0);
      text ("Game Over", width/2 - 80, height/2);
      for(i = 0; i < pipe.length; i++){
        pipe[i].xVelocity = 0;
        bison.y = -20;
      }
    }

    // Scoring
    textSize(35);
    fill(255, 0, 0);
  text("Score", width/2 - 40, height/8);
  text(score, width/2 - 5, height/5.5);
    for(let i = 0; i < pipe.length; i++){
      if(pipe[i].x + 100 >= bison.x - 4 && pipe[i].x + 100 <= bison.x + 4 && pipe[i].y + pipe[i].length <= bison.y
        && pipe[i].y2 >= bison.y){
        score += 1;
      }
    }


}
}



function mousePressed(){
  // Play cool sound if bison jumps
  appajump.play();
  // Reverse bison speed
  bison.ySpeed = -6;
}

function start(){
  // Start out the game
  fill(255, 0, 0);
  text("Flappy Bison", width/2 - 140, height/2 + 25);
  text("Play", width/2 - 40, height/2 + 200);
  end = false;
  xPosition = 1200;
  yPosition = 0;
  pipe = [];
}

function sleep(milliseconds) {
  // Delay for when you die so you can see how you die
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function keyTyped() {
  // Press ENTER to start
  if (event.keyCode == 13){
    click = false;
    end = false;
    score = 0;
    pipe.push(new Barrier);
  }

}
