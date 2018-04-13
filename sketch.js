// Bison variables
let bison;
let xPos = 300;
let yPos = -20;
let appa1;
let appa2;
let appa3;
let appas = [];
let cycleappa = 0;
let cyclesprite;
let timer = 55;
let myIntervalArray = [];

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
let press = true;

// Background variables
let begin;
let chaseregular;
let chaseinverted;
let backgroundx = 0;
let backgroundx2 = 1200;
let backgroundspeed = -0.5;

// Music variables
let appagrowl;
let appajump;

// Load images and sound
function preload(){
  appa1 = loadImage("appaside.png");
  appa2 = loadImage("appaside2.png");
  appa3 = loadImage("appaside3.png");
  tree = loadImage("treepillar.png");
  begin = loadImage("forestpic.jpg");
  chaseregular = loadImage("forestchaseregular2.jpg");
  chaseinverted = loadImage("forestchaseinverted2.jpg");
  appagrowl = loadSound("Appagrowl.wav");
  appajump = loadSound("appajump.wav");
  appas [0]= appa1;
  appas[1] = appa2;
  appas[2]= appa3;
  appas[3]= appa2;

}


// Create Bison object
class Bird{
  constructor(){
    this.x = xPos;
    this.y = yPos;
    this.h = 50;
    this.l = 100;
    this.ySpeed = 0;
  }

// Draw bison
  makeBison(){
    noStroke();
    fill(255);
    imageMode(CENTER);
    image(appas[cycleappa%4], this.x, this.y, this.l, this.h);
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
  imageMode(CORNER);
  image(chaseregular, backgroundx, 0, 1200, 800);
  image(chaseinverted, backgroundx2, 0, 1200, 800);
  moveBackground();
  if(backgroundx <= backgroundx - 1200){
    backgroundx = 1200;
  }
  if(backgroundx2 <= backgroundx2 - 2400){
    backgroundx2 = 1200;
  }

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

// Reset interval
if(cycleappa%4 == 0){
  clearInterval(cyclesprite);
}
// if(timer >=){
//   cycleappa = 0;
//   clearInterval(cyclesprite);
// }
}



function mousePressed(){
  // clearInterval(cyclesprite);
  // cycleappa = 0;
  // Play cool sound if bison jumps
  appajump.play();
  // Reverse bison speed
  bison.ySpeed = -6;
  // Start conditions
  //(press is so that you can't click the spot again and reset the game)
  if(press){
  if(mouseX >= width/2 - 100 && mouseX <= width/2 + 20 &&
     mouseY >= height/2 + 180 && mouseY <= height/2 + 240){
      click = false;
    end = false;
    score = 0;
    pipe.push(new Barrier);
    press = false;
  }

}

// Establish interval for animation of tail
// cyclesprite = setInterval(tailflap, 55);
// tailflap();
// if(cycleappa > 5){
//   cycleappa = 0;
//   clearInterval(cyclesprite);
// }

 cyclesprite = setInterval(tailflap, timer);
 tailflap();
console.log(cyclesprite);
// if(!cyclesprite){
//   cyclesprite = setInterval(tailflap, timer);
// }else{
//     cyclesprite = false;
//     clearInterval(cyclesprite);
//     cycleappa = 0;
//   }
// if(intervalID <= timer){
//   clearInterval(cyclesprite);
//   cycleappa = 0;
// }

myIntervalArray.push(cyclesprite);

for (var i=0; i<myIntervalArray.length; i++){
  if(i > 1){
  clearInterval(myIntervalArray[i]);
  cycleappa = 0;
}
}
}

// function mouseReleased(){
//   cycleappa = 0;
//   clearInterval(cyclesprite);
// }

function start(){
  // Start out the game
  fill(255, 0, 0);
  text("Flappy Bison", width/2 - 140, height/2 + 25);
  text("Play", width/2 - 40, height/2 + 200);
  end = false;
  xPosition = 1200;
  yPosition = 0;
  pipe = [];
  press = true;
  backgroundx = 0;
  backgroundx2 = 1200;
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

// Rotate between appa images
function tailflap(){
  cycleappa++;

}

function moveBackground(){
  backgroundx += backgroundspeed;
  backgroundx2 += backgroundspeed;
}
