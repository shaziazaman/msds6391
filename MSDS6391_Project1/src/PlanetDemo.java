import java.util.ArrayList;

import processing.core.PApplet;
import processing.core.PImage;
import processing.data.JSONArray;
import processing.data.JSONObject;

public class PlanetDemo extends PApplet {
	// NasaApiConfig will be used get set and get specific url for NASA Api
	NasaApiConfig nasaApiConfig  = new NasaApiConfig();
	
	// imageList will hold all the images being retrieved from NASA
	ArrayList<PImage> imageList = new ArrayList<>();
	
	// imageIndex will be used by imageList to retrieve image at specific index
	// it will be reset in draw method when last image from the listhas been displayed to start over
	int imageIndex = 0;
	
	static public void main(String[] passedArgs){
		String[] appletArgs = new String[] {"PlanetDemo"};
		
		// if any arguments have been passed to the application
		// add it to the argument list to start the applet
		if(passedArgs != null) {
			appletArgs = concat(appletArgs, passedArgs);
		}
		
		// start the applet with all the arguments available
		PApplet.main(appletArgs);
	}


	@Override
	public void settings() {
		size(700, 700, P3D);
	}


	@Override
	public void setup() {
				// initialize jsonList as NULL
		JSONArray jsonList = null;
		
		// if date has been passed as application argument
		// then use the request date to retrieve images
		if(this.args != null && this.args.length > 0) {
			// retrieve the information about images of earth captured by NASA for a request date
			// the result will be saved as JSONArray
			String requestedDateString = this.args[0];
			jsonList = loadJSONArray(nasaApiConfig.getDerivedApiURL(requestedDateString));
		} else {
			// retrieve the information about latest images of earth captured by NASA
			// the result will be saved as JSONArray
			jsonList = loadJSONArray(nasaApiConfig.getDerivedApiURL());
		}
		// print the response received from call to NASA API
		System.out.println(jsonList.toString());
		// iterate through JSONArray to get information about each image
		for(int index = 0; index < jsonList.size(); index++) {
			JSONObject jsonObject = jsonList.getJSONObject(index);
			// capture the date when image was taken by NASA
			String imageDateString =  jsonObject.getString("date");
			// capture the image name
			String imageName = jsonObject.getString("image");
			// retrieve specific image from NASA based on image date and name
			PImage img = loadImage(nasaApiConfig.getDerivedImageURL(imageDateString, imageName), nasaApiConfig.imageFileType);
			// print the link being used to retrieve image from NASA
			System.out.println("Image link: " + nasaApiConfig.getDerivedImageURL());
			// cropped the image for the planet Earth only
			PImage croppedimg = cropImageCircle(img,1000,1000,1500);
			// Resize the image to fit in display window
			croppedimg.resize(2*width/3,2*height/3);
			// Add the image to image List, it will be used later to display image
			imageList.add(croppedimg);
		}
		
		//Get information of all available dates of images to use for specific date request
		JSONArray imageDateList = loadJSONArray(nasaApiConfig.getAllAvailableDates());
		System.out.println("All available dates: " + imageDateList.toString());
	}
	
	@Override
	public void draw() {
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
	
	PImage cropImageCircle(final PImage inputImg, final int cx, final int cy, int diam) {
		  final int rad = (diam = abs(diam))>>1, radSq = rad*rad;
		 
		  final int[] p = inputImg.pixels;
		  final int w = inputImg.width, h = inputImg.height;
		  //final int cx = w>>1, cy = h>>1;
		 
		  final PImage outputImg = createImage(diam, diam, ARGB);
		  final int[] q = outputImg.pixels;
		 
		  final int minX = max(cx - rad, 0);
		  final int maxX = min(cx + rad, w);
		 
		  final int minY = max(cy - rad, 0);
		  final int maxY = min(cy + rad, h);
		 
		  for (int y = minY; y < maxY;) {
		    final float cySq = sq(cy - y);
		    final int rw1 = w*y, rw2 = diam*(y++ - minY);
		 
		    for (int x = minX; x < maxX; x++)
		      if (sq(cx - x) + cySq <= radSq)  q[rw2 + x - minX] = p[rw1 + x];
		  }
		 
		  outputImg.updatePixels();
		  return outputImg;
		}


}
