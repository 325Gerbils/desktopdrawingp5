var pmousex, pmousey;
var bg, drawOn;
var drawingMode;
let pGraphics; 
var vertex1;
var backgroundShowing = false;
var rPressed, cPressed, iPressed, lPressed, hPressed, ePressed;
var strkWeight;
var whiteDrawing = false;
let input;
var currentColor;
let colorPicker;
var colorPickerShowing;
var fillMode = false;
var shiftPressed, altPressed;
var brightness;

function setup() {
  createCanvas(windowWidth, windowHeight);

  strkWeight = 5;
  pGraphics = createGraphics(windowWidth, windowHeight);
  pGraphics.background(255);
  pGraphics.stroke(0);
  pGraphics.strokeWeight(strkWeight);
  pGraphics.noFill();
  pGraphics.rectMode(CORNERS);
  stroke(0);
  strokeWeight(strkWeight);
  noFill();
  rectMode(CORNERS);
  currentColor = color(0);
  brightness = 255;

  bg = loadImage("data/background.jpg");
  drawingMode = 0;
  rPressed = false;
  input = createFileInput(function handleFile(file) {
    if (file.type === 'image') {
      bg = createImg(file.data, '');
      bg.hide();
    }
    input.position(-9999, -9999);
  }
  );
  input.position(-9999, -9999);

  colorPicker = createGraphics(windowWidth, windowHeight);
  drawColorPicker();
}

function draw() {

  if (iPressed) {
    input.position(0, 0);
  } else {
    input.position(-9999, -9999);
  }
  colorPickerShowing = hPressed;

  if (fillMode) {
    fill(currentColor);
    pGraphics.fill(currentColor);
  } else {
    noFill();
    pGraphics.noFill();
  }

  stroke(currentColor);
  pGraphics.stroke(currentColor);

  if (backgroundShowing) {
    image(bg, 0, 0, width, height);
    cursor();
  } else if (colorPickerShowing) {
    cursor();
    image(colorPicker, 0, 0, width, height);
    strokeWeight(2);
    //fill(get(mouseX, mouseY));
    ellipse(mouseX+30, mouseY+40, 50, 50);
  } else {
    noCursor();
    if (mouseIsPressed && mouseButton == LEFT && drawingMode == 0 && !ePressed) {
      pGraphics.line(mouseX, mouseY, pmouseX, pmouseY);
    }
    image(pGraphics, 0, 0, width, height);

    if (mouseIsPressed && mouseButton == LEFT && drawingMode == 1 && rPressed) {
      rect(vertex1.x, vertex1.y, mouseX, mouseY);
    }

    if (mouseIsPressed && mouseButton == LEFT && drawingMode == 2 && cPressed) {
      var r = sqrt((mouseX-vertex1.x)*(mouseX-vertex1.x) + (mouseY-vertex1.y)*(mouseY-vertex1.y));
      ellipse(vertex1.x, vertex1.y, r*2, r*2);
    }

    if (mouseIsPressed && mouseButton == LEFT && drawingMode == 3 && lPressed) {
      line(vertex1.x, vertex1.y, mouseX, mouseY);
    }

    if (rPressed) { // rect
      strokeWeight(2);
      rect(mouseX-5, mouseY-5, mouseX+5, mouseY+5);
    } else if (cPressed) { // circle
      strokeWeight(2);
      ellipse(mouseX, mouseY, 10, 10);
    } else if (lPressed) { // line
      strokeWeight(2);
      line(mouseX, mouseY, mouseX+10, mouseY-10);
      ellipse(mouseX, mouseY, 4, 4);
    } else if (ePressed) {
      cursor();
      strokeWeight(2);
      //fill(get(mouseX, mouseY));
      ellipse(mouseX+30, mouseY+40, 50, 50);
    } else { // scribble
      point(mouseX, mouseY);
    }
    strokeWeight(strkWeight);
  }
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
  if (key == 'f') {
    fillMode = !fillMode;
  }
  if (keyCode == SHIFT) {
    shiftPressed = true;
  }
  if (keyCode == ALT) {
    altPressed = true;
  }
  if (key == 'h') {
    hPressed = true;
  }
  if (key == 'e') {
    ePressed = true;
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
  if (keyCode == SHIFT) {
    shiftPressed = false;
  }
  if (keyCode == ALT) {
    altPressed = false;
  }
  if (key == 'h') {
    hPressed = false;
  }
  if (key == 'e') {
    ePressed = false;
  }
}

function mousePressed() {
  if (rPressed) {
    drawingMode = 1;
  }
  if (cPressed) {
    drawingMode = 2;
  }
  if (lPressed) {
    drawingMode = 3;
  }
  if (ePressed || colorPickerShowing) {
    currentColor = get(mouseX, mouseY);
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
  if (drawingMode == 3 && lPressed) {
    line(vertex1.x, vertex1.y, mouseX, mouseY);
    pGraphics.line(vertex1.x, vertex1.y, mouseX, mouseY);
  }
  drawingMode = 0;
}
function mouseWheel(event) {
  if (colorPickerShowing) {
    brightness = constrain(brightness - event.delta, 0, 255);
    drawColorPicker();
  } else {
    strkWeight = constrain(strkWeight - event.delta/(shiftPressed?15:(altPressed?500:150)), 1, 1000);
    pGraphics.strokeWeight(strkWeight);
    strokeWeight(strkWeight);
  }
}

function drawColorPicker() {
  colorPicker.colorMode(HSB, 255);
  colorPicker.noStroke();
  var w = 32;
  for (let i = 0; i < colorPicker.width/w; i++) {
    for (let j = 0; j < colorPicker.height/w; j++) {
      colorPicker.fill(i/(colorPicker.width/w)*255, 255-j/(colorPicker.height/w)*255, round(brightness/w)*w);
      colorPicker.rect(i*w, j*w, w, w);
    }
  }
}
