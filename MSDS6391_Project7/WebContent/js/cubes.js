/**
 * 
 */


var  menuOption=0;
var up,down;


function setup() {
   createCanvas(1500,950,P3D);
   background(255);
   //frameRate(60);
   menuOption();
}

function draw() {
	if (keyPressed) {
	    if(menuOption==1){ 
	     displayCube(1);
	    }
	    if(menuOption==2){ 
	     displayCube(2);
	    }
	    
	    if(menuOption==3){ 
	    displayCube(3);
	    }//if
	  
	  if(menuOption==4){ 
	    displayCube(4);
	    }//if
	  }//close if(keyPressed)
	  
}//close draw

function keyPressed() {
	  if(key=='1')  {
	    menuOption= 1;
	  } 
	  
	  if (key=='2') {
	    menuOption=2;
	  }
	    
	    if (key=='3') {
	    menuOption=3;
	  }
	  
	  if (key=='4') {
	    menuOption=4;
	  }
	  
	  if(keyCode==UP)  {
	    up=true;
	  } 
	  if(keyCode==DOWN) {
	    down=true;
	  }

	} //keypressed
	  
	  
function keyReleased() {
	   if(keyCode==UP)  {
	    up=false;
	  }
	  
	  if(keyCode== DOWN) {
	    down=false;
	  } 
	  
	}//keyreleased

function menuOption(){
	  
	  strokeWeight(3);
	  textSize(20);
	  fill(0);
	  text("SELECT CUBE ",650,40); 
	  text("1=Left Cube   2=Center Cube     3=Right Cube   4=Clear Screen ",470,80);
	
	}

function displayCube( menuOption){
     var menuOption;
	  if (menuOption ==1) { 
	  println("This is option 1");
	  translate(0,300,-600);
	  rotateX(-PI/8);
	  rotateY(-PI/5);
	 rotateX(frameCount*PI/150);
	 rotateY(frameCount*PI/170);
	  
	for(var x = 0; x < 300; x+=100){
	  for(var z = 0; z < 300; z +=100){
	    for(var y = 0; y < 300; y +=100){
	      pushMatrix();
	      translate(x,y,z);
	      fill(random(255),random(255),random(255));
	      box(100,100,100);
	      popMatrix();
	    }//for
	  }//for
	  }//for
	  
	  }//if option 1
	  
	  if (menuOption ==2 ){
	   
	   println("This is option 2");
	  translate(700,300,-600);
	  //translate(width/2,100,-500);
	 
	  rotateX(-PI/8);
	  rotateY(-PI/4);
	   rotateX(frameCount*PI/200);
	   rotateY(frameCount*PI/300);
	for(var x = 0; x < 300; x+=100){
	  for(var z = 0; z < 300; z +=100){
	    for(var y = 0; y < 300; y +=100){
	      pushMatrix();
	      translate(x,y,z);
	      fill(random(255),random(255),random(255));
	      box(100,100,100);
	      popMatrix();
	    }//for
	  }//for
	  }//for
	  
	  
	  }//menuOption 2
	  
	  if (menuOption==3){
	   
	  println("This is option 3"); 
	  translate(1400,300,-600);
	  //translate(width/2,100,-500);
	 
	  rotateX(-PI/8);
	  rotateY(-PI/2.5);
	  rotateX(frameCount*PI/300);
	  rotateY(frameCount*PI/400);
	for(var x = 0; x < 300; x+=100){
	  for(var z = 0; z < 300; z +=100){
	    for(var y = 0; y < 300; y +=100){
	      pushMatrix();
	      translate(x,y,z);
	      fill(random(255),random(255),random(255));
	      box(100,100,100);
	      popMatrix();
	    }//for
	  }//for
	  }//for
	   
	  }//option 3
	  
	  if (menuOption==4){
	  clearScreen();
	  }
	}//displayCube

function clearScreen(){

	  fill(255);
	  noStroke();
	  rect(0,100,1500,850);
	}//clearScreen  