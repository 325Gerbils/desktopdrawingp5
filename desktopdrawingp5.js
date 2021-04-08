var pmousex, pmousey;
var bg;
var drawingMode;
let pGraphics;  
var pmousepressed = false;
var vertex1;
var backgroundShowing = false;
var rPressed, cPressed, iPressed, lPressed;

let input;

function setup() {
  createCanvas(windowWidth, windowHeight);

  pGraphics = createGraphics(windowWidth, windowHeight);
  pGraphics.background(255);
  pGraphics.stroke(0);
  pGraphics.strokeWeight(5);
  pGraphics.noFill();
  pGraphics.rectMode(CORNERS);
  stroke(0);
  strokeWeight(5);
  noFill();
  rectMode(CORNERS);

  bg = loadImage("data/background.jpg");
  drawingMode = 0;
  rPressed = false;
  input = createFileInput(function handleFile(file) {
    if (file.type === 'image') {
      bg = createImg(file.data, '');
      bg.hide();
    }
  }
  );
  input.position(-9999, -9999);
}

function draw() {

  if (backgroundShowing) {
    image(bg, 0, 0, width, height);
  } else {

    if (mouseIsPressed && drawingMode == 0) {
      pGraphics.line(mouseX, mouseY, pmousex, pmousey);
    }
    image(pGraphics, 0, 0, width, height);

    if (mouseIsPressed && drawingMode == 1 && rPressed) {
      rect(vertex1.x, vertex1.y, mouseX, mouseY);
    }

    if (mouseIsPressed && drawingMode == 2 && cPressed) {
      var r = sqrt((mouseX-vertex1.x)*(mouseX-vertex1.x) + (mouseY-vertex1.y)*(mouseY-vertex1.y));
      ellipse(vertex1.x, vertex1.y, r*2, r*2);
    }
  }

  if (iPressed) {
    input.position(0, 0);
  } else {
    input.position(-9000, -9000);
  }

  pmousex = mouseX;
  pmousey = mouseY;
}

function keyPressed() {
  if (key == ' ' && !backgroundShowing) {
    pGraphics.background(255);
  }
  if (key == 'w') {
    if (!backgroundShowing) {
      backgroundShowing = true;
    } else {
      backgroundShowing = false;
    }
  }
  if (key == 'c') {
    cPressed = true;
    drawingMode = 2;
    if (mouseIsPressed) {
      vertex1 = createVector(mouseX, mouseY);
    }
  }
  if (key == 'r') {
    rPressed = true;
    drawingMode = 1;
    if (mouseIsPressed) {
      vertex1 = createVector(mouseX, mouseY);
    }
  }
  if (key == 'l') {
    lPressed = true;
    drawingMode = 3;
    if (mouseIsPressed) {
      vertex1 = createVector(mouseX, mouseY);
    }
  }
  if (key == 'i') {
    iPressed = true;
  }
}

function keyReleased() {
  if (key == 'r') {
    rPressed = false;
  }
  if (key == 'c') {
    cPressed = false;
  }
  if (key == 'l') {
    lPressed = false;
  }
  if (key == 'i') {
    iPressed = false;
  }
}

function mousePressed() {
  if (rPressed) {
    drawingMode = 1;
  }
  if (cPressed) {
    drawingMode = 2;
  }
  if (drawingMode != 0) {
    vertex1 = createVector(mouseX, mouseY);
  }
}

function mouseReleased() {
  if (drawingMode == 1 && rPressed) {
    pGraphics.rect(vertex1.x, vertex1.y, mouseX, mouseY);
    rect(vertex1.x, vertex1.y, mouseX, mouseY);
  }
  if (drawingMode == 2 && cPressed) {
    var r = sqrt((mouseX-vertex1.x)*(mouseX-vertex1.x) + (mouseY-vertex1.y)*(mouseY-vertex1.y));
    ellipse(vertex1.x, vertex1.y, r*2, r*2);
    pGraphics.ellipse(vertex1.x, vertex1.y, r*2, r*2);
  }
  drawingMode = 0;
}
