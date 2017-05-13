import processing.core.PApplet;
import processing.core.PImage;
import processing.data.JSONArray;

public class PlanetDemo extends PApplet {
	NasaApiConfig nasaApiConfig  = new NasaApiConfig();
	PImage img;
	
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
		super.settings();
		size(700, 700, P3D);
	}


	@Override
	public void setup() {
		callApi(nasaApiConfig.apiUrl);
		System.out.println("Image link:" + nasaApiConfig.imageUrl);
		img = loadImage(nasaApiConfig.imageUrl, nasaApiConfig.imageFileType);
	}
	
	@Override
	public void draw() {
		// TODO Auto-generated method stub
		super.draw();
		img.resize(width, height);
		image(img, 0, 0);
	}

	public void callApi(String apiUrl) {
		JSONArray jsonList = loadJSONArray(apiUrl);
		System.out.println(jsonList.toString());
	}
	
	
}
