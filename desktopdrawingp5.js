var pmousex, pmousey;
var bg;
var drawMode;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  stroke(0);
  strokeWeight(5);
  bg = loadImage("data/background.jpg");
  drawMode = true;
}

function draw() {
  if (mouseIsPressed && drawMode) {
    line(mouseX, mouseY, pmousex, pmousey);
  }
  pmousex = mouseX;
  pmousey = mouseY;
}

function keyPressed() {
  if (key == ' ' && drawMode) {
    background(255);
  }
  if (key == 'w') {
    if (drawMode) {
      image(bg, 0, 0, width, height);
      drawMode = false;
      noLoop();
    } else {
      background(255);
      drawMode = true;
      loop();
    }
  }
}
