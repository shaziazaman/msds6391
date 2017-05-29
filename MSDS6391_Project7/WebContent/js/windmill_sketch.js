/**
 * Windmill Visualization with P5
 */

var xStandTop = 150;
var yStandTop = 150;
var widthStandTop = 1;
var diameter = widthStandTop;
var lengthStand = 200;
var petalLength = 115;
var angleDifference=0.2;
var angleToDraw=0;
var standColor;
var centerColor;
var petalColor;

function setup()
{
  createCanvas(400,400);
  standColor = color(4,131,9);
  centerColor = color(121,113,97);
  petalColor = color(250,218,103);
  noStroke();
}

function draw()
{
  background(102,206,193);
  drawStand(xStandTop,yStandTop,lengthStand,widthStandTop);
  
  var xForCenter = xStandTop + widthStandTop/2;
  var yForCenter = drawCenter(xForCenter, yStandTop, diameter);
  angleToDraw = (angleToDraw + 2) % 360;
  
  drawPetalAttachment(xForCenter,yForCenter,angleToDraw+0,diameter/2);
  drawPetalAttachment(xForCenter,yForCenter,angleToDraw+90,diameter/2);
  drawPetalAttachment(xForCenter,yForCenter,angleToDraw+180,diameter/2);
  loop();
  delay(80);
}

function drawStand(startX, startY, Length, topWidth)
{
  var x1 = startX;
  var y1 = startY;
  var x2 = startX + topWidth;
  var y2 = startY;
  var fractionWidth=topWidth/0.025;
  var x4 = startX - fractionWidth;
  var y4 = startY + Length;
  var x3 = startX + topWidth + fractionWidth;
  var y3 = y4;
  fill(standColor);
  quad(x1,y1,x2,y2,x3,y3,x4,y4);
  noFill();
}

function drawCenter(xCenter, yCenter, diameter)
{
  var x = xCenter;
  var y = yCenter - diameter/2;
  fill(centerColor);
  ellipse(x,y,diameter,diameter);
  noFill();
  return y;
}

function findXonCenter(xForCenter, radius, angleToDraw)
{
  return xForCenter + radius * cos(angleToDraw);
}

function findYonCenter(yForCenter, radius, angleToDraw)
{
  return yForCenter + radius * sin(angleToDraw);
}

function drawPetal(xStart, yStart, angleToDraw)
{
  var x3=xStart;
  var y3=yStart;
  var x1=findXonCenter(x3, petalLength, angleToDraw-angleDifference);
  var y1=findYonCenter(y3, petalLength, angleToDraw-angleDifference);
  var x2=findXonCenter(x3, petalLength, angleToDraw+angleDifference);
  var y2=findYonCenter(y3, petalLength, angleToDraw+angleDifference);
  fill(petalColor);
  triangle(x1,y1,x2,y2,x3,y3);
  noFill();
}

function drawPetalAttachment(xForCenter, yForCenter, angleToDraw, radius)
{
  var xOnCenter = findXonCenter(xForCenter, radius, angleToDraw);
  var yOnCenter = findYonCenter(yForCenter, radius, angleToDraw);
  drawPetal(xOnCenter, yOnCenter,angleToDraw);
}