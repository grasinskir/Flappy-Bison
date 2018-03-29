// Bison variables
let bison;
let xPos = 300;
let yPos = 400;

// Pipe variables
let pipe = [];
let xPosition = 1100;
let yPosition = 0;

// End conditions
let end = false;

// Score variables
let score = 0;


// Create Bison object
class Bird{
  constructor(){
    this.x = xPos;
    this.y = yPos;
    this.r = 20;
    this.ySpeed = 0;
  }

// Draw bison
  makeBison(){
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r, this.r);
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
    rect(this.x, this.y, this.width, this.length);
    rect(this.x, this.y2, this.width, this.length2);
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
}


function draw(){
  background(100);

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
     if(pipe[i].x == 781.7499999999999){
       pipe.push(new Barrier);
     }

     // Delete old pipe if it goes offscreen
     if(pipe[i].x == -103.05499999999684){
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
     }
   }

   console.log(end);

    // End conditions
    if(end){
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



function mousePressed(){
  bison.ySpeed = -6;
}
