/**
 * 
 */


var  angle=0;

function setup() {
   createCanvas(1500,1000,WEBGL);
   //background(255);
}

function draw() {
	 background(51);
	 translate(0,0,mouseX);
	 rotateX(angle);
	 rotateY(angle*.06);
	 box(200);
	 angle +=0.1;
	   
}//close draw

