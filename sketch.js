// Bison variables
let bison;
let xPos = 300;
let yPos = 400;

// Pipe variables
let pipe = [];


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
    this.xVelocity = -4;
    this.width = 100;
    this.length = random(200, 600);
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
   for(i = 0; i < pipe.length; i++){
     pipe[i].makePipe();
     pipe[i].movePipe();
     // Create new pipe every 200 "units"
     if(pipe[i].x < 1000 && pipe[i].x > 800){
       pipe.push(new Barrier);
     }
   }

}



function mousePressed(){
  bison.ySpeed = -6;
}
