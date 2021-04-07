var pmousex, pmousey;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  stroke(0);
  strokeWeight(5);
}

function draw() {

  if (mouseIsPressed) {
    line(mouseX, mouseY, pmousex, pmousey);
  }

  if (keyIsPressed && key == ' ') {
    background(255);
  }
  print(frameRate);

  pmousex = mouseX;
  pmousey = mouseY;
}
