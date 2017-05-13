import processing.core.PApplet;

public class PlanetDemo extends PApplet {
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
}
