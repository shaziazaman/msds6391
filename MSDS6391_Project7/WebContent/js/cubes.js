/**
 * 
 */


var  angle=0;

function setup() {
   createCanvas(1500,1000,WEBGL);
    //displayText();
}

function draw() {
	 background(50);
	 push();
	 translate(0,-120,0);
	 rotateX(angle);
	 rotateY(angle*.08);
	 box(200);
	 angle +=0.12;
	 pop();
	 push();
	 translate(-width/3,-120,0);
	 rotateX(angle);
	 rotateY(angle*.08);
	 box(200);
	 angle +=0.12;
	 pop();
	 translate(width/3,-120,0);
	 rotateX(angle);
	 rotateY(angle*.08);
	 box(200);
	 angle +=0.12;	 
	   
}//close draw

function displayText(){
	  textSize(20);
	  fill(255)
	  text("Cube Visualization Using WEBGL",650,200); 
	  text("3D Rendering in P5 ",470,80);
	 
	}

