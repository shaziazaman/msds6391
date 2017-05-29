/**
 * sketch plant images being retrieved from NASA
 */

var apiKey = "?api_key=9Ihs7mZs2OkFpVeNHaRF76mnDZ02lOSZoe2NIeeh";
var apiBaseUrl = "https://api.nasa.gov/EPIC/api/natural/images";
var imageType = "natural";
var imageFileType = "png";
var imageFileName = "epic_1b_20170510190006_02";
var imageFileYear = "2017";
var imageFileMonth = "05";
var imageFileDay = "10";
var imageBaseUrl = "https://api.nasa.gov/EPIC/archive/";

var img;

function preload() {
	// retrieve specific image from NASA based on image date and name
	  img = loadImage(getDerivedImageURL());
}

function setup() {
	createCanvas(700, 700);	
	background(0);
	image(img, 0, 0)
}

//function cropImageCircle(inputImg, cx, cy, diam) {
//	  final rad = diam/2, radSq = rad*rad;
//	  final p = inputImg.pixels;
//	  final w = inputImg.width, h = inputImg.height;
//	  
//	  final outputImg = createImage(diam, diam, ARGB);
//	  final q = outputImg.pixels;
//	 
//	  final minX = max(cx - rad, 0);
//	  final maxX = min(cx + rad, w);
//	 
//	  final minY = max(cy - rad, 0);
//	  final maxY = min(cy + rad, h);
//	 
//	  for (var y = minY; y < maxY;) {
//	    final cySq = sq(cy - y);
//	    final rw1 = w*y, rw2 = diam*(y++ - minY);
//	 
//	    for (var x = minX; x < maxX; x++)
//	      if (sq(cx - x) + cySq <= radSq)  q[rw2 + x - minX] = p[rw1 + x];
//	  }
//	 
//	  outputImg.updatePixels();
//	  return outputImg;
//}


// This method will be used to generate image URL based on the class data members
// that is already being set in the class
function getDerivedImageURL() {
	// create image URL based on parameter being set in class
	return imageBaseUrl + imageType + "/" +
			imageFileYear + "/" + imageFileMonth + "/" + imageFileDay + "/" +
			imageFileType + "/" + imageFileName + "." + imageFileType + apiKey;
}

