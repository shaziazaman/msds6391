/**
 * sketch plant images being retrieved from NASA
 */

// imageList will hold all the images being retrieved from NASA
var imageList = [];
	
// imageIndex will be used by imageList to retrieve image at specific index
// it will be reset in draw method when last image from the listhas been displayed to start over
var imageIndex = 0;

// initialize jsonList as NULL
JSONArray jsonList = null;

function preload() {
	// retrieve the information about latest images of earth captured by NASA
	// the result will be saved as JSONArray
	jsonList = loadJSON(getDerivedApiURL());
	
	// print the response received from call to NASA API
	console.log(jsonList.toString());
	// iterate through JSONArray to get information about each image
	for(var index = 0; index < jsonList.size(); index++) {
		JSONObject jsonObject = jsonList.getJSONObject(index);
		// capture the date when image was taken by NASA
		String imageDateString =  jsonObject.getString("date");
		// capture the image name
		String imageName = jsonObject.getString("image");
		// retrieve specific image from NASA based on image date and name
		PImage img = loadImage(getDerivedImageURL(imageDateString, imageName), imageFileType);
		// print the link being used to retrieve image from NASA
		console.log("Image link: " + getDerivedImageURL());
		// cropped the image for the planet Earth only
		PImage croppedimg = cropImageCircle(img,1024,1024,1500);
		// Resize the image to fit in display window
		croppedimg.resize(2*width/3,2*height/3);
		// Add the image to image List, it will be used later to display image
		imageList.add(croppedimg);
	}
	
	//Get information of all available dates of images to use for specific date request
	JSONArray imageDateList = loadJSONArray(getAllAvailableDates());
	System.out.println("All available dates: " + imageDateList.toString());
	
}

function setup() {
	createCanvas(700, 700, P3D);	
}

function draw() {
	// iterate over image list to display new image every time
	image(imageList.get(imageIndex), width/6, height/6);
	// increase the imageIndex to retrieve new image next time in draw
	imageIndex = imageIndex + 1;
	// if imageIndex exceed the size of image List 
	// then reset to start displaying images from beginning of the list
	if(imageIndex >= imageList.size()){
		imageIndex = 0;
	}
	// add delay for 250 millisecond to redraw the window
	delay(250);
}

function cropImageCircle(inputImg, cx, cy, diam) {
	  final rad = diam/2, radSq = rad*rad;
	  final p = inputImg.pixels;
	  final w = inputImg.width, h = inputImg.height;
	  
	  final outputImg = createImage(diam, diam, ARGB);
	  final q = outputImg.pixels;
	 
	  final minX = max(cx - rad, 0);
	  final maxX = min(cx + rad, w);
	 
	  final minY = max(cy - rad, 0);
	  final maxY = min(cy + rad, h);
	 
	  for (var y = minY; y < maxY;) {
	    final cySq = sq(cy - y);
	    final rw1 = w*y, rw2 = diam*(y++ - minY);
	 
	    for (var x = minX; x < maxX; x++)
	      if (sq(cx - x) + cySq <= radSq)  q[rw2 + x - minX] = p[rw1 + x];
	  }
	 
	  outputImg.updatePixels();
	  return outputImg;
	}


