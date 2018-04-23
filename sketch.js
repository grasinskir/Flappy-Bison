// Bison variables
let bison;
let xPos = 300;
let yPos = 400;
let appa1;
let appa2;
let appa3;
let appas = [];
let cycleappa = 0;
let cyclesprite;
let timer = 55;
let gravity = .2;

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
let secret = false;

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

// Phillip mode = really really hard
let Phillip = false;

// Chad mode = gravity control
let Chad = false;
let gforce = true;
let invertedappa;

// Load images and sound
function preload(){
  // Appas
  appa1 = loadImage("appaside.png");
  appa2 = loadImage("appaside2.png");
  appa3 = loadImage("appaside3.png");
  // Pipe
  tree = loadImage("treepillar.png");
  // Start screen image
  begin = loadImage("forestpic.jpg");
  // Background images during the game
  chaseregular = loadImage("forestchaseregular2.jpg");
  chaseinverted = loadImage("forestchaseinverted2.jpg");
  // Appa dying sound
  appagrowl = loadSound("Appagrowl.wav");
  // Appa jumping sound
  appajump = loadSound("appajump.wav");
  // A certain appa is selected by a certain array value
  appas[0] = appa1;
  appas[1] = appa2;
  appas[2] = appa3;
  appas[3] = appa2;
  // Chad
  invertedappa = loadImage("appasideupsidedown.png");

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
    this.ySpeed += gravity;
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

// Setup the game, make bison, add pipes, set text size
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
    // Phillip mode is impossible
    if(Phillip){
      gravity = 1;
      timer = 30;
    }

    // Rules for chad mode
    if(Chad){
      // No interval
      clearInterval(cyclesprite);
      cycleappa = 0;
    }
    // Tail flap is quicker if you press the secret button
    if(secret){
      timer = 35;
    }
  // Set background for during the game
  imageMode(CORNER);
  image(chaseregular, backgroundx, 0, 1200, 800);
  image(chaseinverted, backgroundx2, 0, 1200, 800);
  moveBackground();
  // Loops backgrounds in sequence
  if(backgroundx + 1200 <= 0){
    backgroundx = 1200;
  }
  if(backgroundx2 + 1200 <= 0){
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
        bison.y = 400;
        clearInterval(cyclesprite);
        cycleappa = 0;
        cyclesprite = 0;
        secret = false;
        gravity = .2;
        Phillip = false;
        Chad = false;
      }
    }

    // Scoring
    textSize(35);
    fill(255, 0, 0);
  text("Score", width/2 - 40, height/8);
  text(score, width/2 - 5, height/5.5);
    for(let i = 0; i < pipe.length; i++){
      if(pipe[i].x + 100 >= bison.x - 4 && pipe[i].x + 100 <= bison.x + 4
        && pipe[i].y + pipe[i].length <= bison.y
        && pipe[i].y2 >= bison.y){
        score += 1;
      }
    }


}

  // Reset interval
  if(cycleappa%4 == 0){
  clearInterval(cyclesprite);
  cycleappa = 0;
  }
}



function mousePressed(){
  console.log(mouseX);
  console.log(mouseY);
  // Clears interval every time mouse is clicked so game doesn't break :D
  clearInterval(cyclesprite);
  // Play cool sound if bison jumps
  // !press is so you won't here sounds on the start screen
  if(!press){
    appajump.play();
  }

  // Reverse bison speed
  bison.ySpeed = -8.5;
  // If you press the secret start button you get a lower jump
  if(secret){
    bison.ySpeed = -6;
  }
  // If in phillip mode, it will be impossible
  if(Phillip){
    bison.ySpeed = -2;
  }

  // If in chad mode, gravity reverses with every mouse click
  if(!press){
    if(Chad){
      // Reverses the gravity
      if(gforce){
        gravity = -0.4;
        appas[0] = invertedappa;
      }
      if(!gforce){
        gravity = 0.4;
        appas[0] = appa1;
      }
      bison.ySpeed = 0;
      gforce = !gforce;
    }
  }

  // Start conditions
  // press is so that you can't click the spot again and reset the game
  if(press){
  if(mouseX >= width/2 - 50 && mouseX <= width/2 + 30 &&
     mouseY >= height/2 + 170 && mouseY <= height/2 + 200){
      click = false;
      end = false;
      score = 0;
      pipe.push(new Barrier);
      press = false;
  }

  // Secret button to press that makes the game easier
  if(mouseX >= 850 && mouseX <= 950 &&
     mouseY >= 250 && mouseY <= 350){
       click = false;
       end = false;
       score = 0;
       pipe.push(new Barrier);
       press = false;
       bison.ySpeed = -6;
       secret = true;
     }

    // Phillip mode button (hard mode)
    if(mouseX >= width/2 + 100 && mouseX <= width/2 + 290 &&
       mouseY >= height/2 + 170 && mouseY <= height/2 + 200){
         click = false;
         end = false;
         score = 0;
         pipe.push(new Barrier);
         press = false;
         Phillip = true;
       }

    // Chad mode button (gravity control)
    if(mouseX >= width/2 + 100 && mouseX <= width/2 + 280 &&
       mouseY >= height/2 + 245 && mouseY <= height/2 + 275){
         click = false;
         end = false;
         score = 0;
         pipe.push(new Barrier);
         press = false;
         Chad = true;
         gforce = true;
         gravity = 0.2;
       }
}

  // Establish interval for animation of tail
  // !press is so that clicking on the start screen doesn't mess up the interval
  if(!press){
    cyclesprite = setInterval(tailflap, timer);
    tailflap();
  }
}

function start(){
  // Start out the game and make sure all variables are set
  textSize(35);
  fill(255, 0, 0);
  text("Flappy Bison", width/2 - 140, height/2 + 25);
  text("Play", width/2 - 40, height/2 + 200);
  text("Phillip Mode", width/2 + 100, height/2 + 200);
  text("Chad Mode", width/2 + 100, height/2 + 275);
  textSize(15);
  text("Version 3.1", 50, 750);
  end = false;
  xPosition = 1200;
  yPosition = 0;
  pipe = [];
  press = true;
  backgroundx = 0;
  backgroundx2 = 1200;
  clearInterval(cyclesprite);
  cycleappa = 0;
  cyclesprite = 0;
  gravity = .2;
  appas[0] = appa1;
  appas[1] = appa2;
  appas[2] = appa3;
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

// Make background scroll across screen
function moveBackground(){
  backgroundx += backgroundspeed;
  backgroundx2 += backgroundspeed;
}
