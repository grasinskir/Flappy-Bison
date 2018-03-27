// Bison variables
let bison;
let xPos = 600;
let yPos = 400;

// Create Bison object
class Bison{
  constructor(){
    this.x = xPos;
    this.y = yPos;
    this.r = 20;
  }

// Draw bison
  makeBison(){
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r, this.r);
  }
}


function setup(){
  createCanvas(1200, 800);


}


function draw(){
  background(100);
  makeBison();
}
