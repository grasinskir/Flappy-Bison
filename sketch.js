// Bison variables
let bison;
let xPos = 300;
let yPos = 400;
let pipe;


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
    this.ySpeed += .15;

  }
}

// Create pipe objects
class Barrier{
  constructor(){
    this.x = 1100;
    this.y = 0;
    this.xVelocity = -10;
    this.width = 100;
    this.length = random(300, 600);
    this.y2 = this.length + 200;
  }

  // Make pipe
  makePipe(){
    noStroke();
    fill(0);
    rect(this.x, this.y, this.width, this.length);
    rect(this.x, this.y2, this.width, this.length);
  }



}


function setup(){
  createCanvas(1200, 800);
  bison = new Bird();
  pipe = new Barrier();
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
   pipe.makePipe();
}



function mousePressed(){
  bison.ySpeed = -5;
}
