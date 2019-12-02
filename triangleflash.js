////////////////////////////////////////////////////////////////////////
// Processing Callbacks
////////////////////////////////////////////////////////////////////////

// a * b == c

var a = 10;
var b = 10;
var answer = "";
var key_prev = "";
var key_lockout_ms = 0;
var key_held = false;
var score = 0;
var hidden = 'c';

function rand_hidden()
{
  var x = Math.floor(random(0, 100));
  x = x % 3;
  a = Math.floor(random(1,13));
  b = Math.floor(random(1,13));
  c = a * b;
  switch (x) {
  case 0:
    hidden = 'a';
    break;
  case 1:
    hidden = 'b';
    break;
  case 2:
    hidden = 'c';
    break;
  default:
    print("what happened? " + x);
    break;
  }
}

function setup()
{
    createCanvas(600, 400);
    smooth();
    stroke(0);
    rand_hidden();
    textAlign(CENTER, CENTER);
}

function draw()
{
    background(0xff, 0xff, 0xd4);
    stroke(0, 0, 0);
    textSize(28);
    fill(0);
        
    // triangle
    text(a, 50, 350);
    text(b, 350, 350);
    text(c, 200, 50);

    // scoreboard
    textSize(20);
    stroke(0xde, 0xde, 0xa2);
    fill(0xde, 0xde, 0xa2);
    rect(400, 0, 599, 399);
    fill(0);
    stroke(0);
    text("Score", 480, 50);
    text(score, 500, 100);

    // hidden element
    var x = 0;
    var y = 0;
    switch (hidden) {
    case 'a':
      x = 50;
      y = 350;
      break;
    case 'b':
      x = 350;
      y = 350;
      break;
    case 'c':
      x = 200;
      y = 50;
      break;
    }
    textSize(36);    
    stroke(0xde, 0xde, 0xa2);
    fill(0xde, 0xde, 0xa2);
    circle(x, y, 50);
    fill(0);
    stroke(0);
    text(answer, x, y);
}

function mousePressed()
{
}

function accept_answer()
{
  var x = parseInt(answer);
  var ok = false;
  switch (hidden) {
  case 'a':
    if (answer == a) {
      ok = true;
    }
    break;
  case 'b':
    if (answer == b) {
      ok = true;
    }
    break;
  case 'c':
    if (answer == c) {
      ok = true;
    }
    break;
  default:
    break;
  }
  if (ok) {
    rand_hidden();
    score++;
  }
  else {
    score--;
  }
  answer = "";
}

function keyPressed()
{
  print("keyPressed: " + key);
  switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (answer.length < 3) {
        answer = answer + key;
      }
      print("answer: " + answer);
      break;
    case ' ':
      answer = "";
      break;
    default:
      break;
  }
  
  switch (keyCode) {
    case DELETE:
    case BACKSPACE:
      answer = answer.substr(0, (answer.length - 2));
      print("delete; now answer: " + answer);
      break;
    case ENTER:
    case RETURN:
      accept_answer();
      break;
    default:
      break;
    }
}
