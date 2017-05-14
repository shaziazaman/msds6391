
public class NasaApiConfig {
	String apiKey = "?api_key=9Ihs7mZs2OkFpVeNHaRF76mnDZ02lOSZoe2NIeeh";
	String apiBaseUrl = "https://api.nasa.gov/EPIC/api/natural/images";
	String apiDateUrl = "https://api.nasa.gov/EPIC/api/natural/date/";
	String apiAllDatesUrl = "https://api.nasa.gov/EPIC/api/natural/all";
	String imageType = "natural";
	String imageFileType = "png";
	String imageFileName = "epic_1b_20170510190006_02";
	String imageFileYear = "2017";
	String imageFileMonth = "05";
	String imageFileDay = "10";
	String imageBaseUrl = "https://api.nasa.gov/EPIC/archive/";
	
	public NasaApiConfig() {
		super();
	}
	
	// This method will be used to get all the available dates when images are captured
	public String getAllAvailableDates() {
		return apiAllDatesUrl + apiKey;
	}
	
	// This method will be used to generate apiURL to retrieve information about
	// lated images of Earth being captured by NASA
	public String getDerivedApiURL() {
		return apiBaseUrl + apiKey;
	}
	
	// Method overloading for getDerivedApiURL with extra parameter
	// This method will be used to generate apiURL to retrieve information about
	// images of Earth being captured by NASA being captured on requested date 
	public String getDerivedApiURL(String dateString) {
			return apiDateUrl + dateString + apiKey;
	}
	
	// This method will be used to generate image URL based on the class data members
	// that is already being set in the class
	public String getDerivedImageURL() {
		// create image URL based on parameter being set in class
		return imageBaseUrl + imageType + "/" +
				imageFileYear + "/" + imageFileMonth + "/" + imageFileDay + "/" +
				imageFileType + "/" + imageFileName + "." + imageFileType + apiKey;
	}

	// Method overloading for getDerivedImageURL with extra parameters
	// This method will be used to reset the image Date and File name information
	// And then generate new image URL based on these variables
	
	public String getDerivedImageURL(String imageDateString, String imageName) {
		// imageDateString is given in format as 2017-05-10 22:11:41
		// date and time part are separated by white space
		
		// use split functionality to break date string into date part and time part
		String[] dateTimeToken = imageDateString.split(" ");
		// capture the date part only for further processing
		String imageDatePart = dateTimeToken[0];
		
		// in date part, year, month and date are separated by -
		// use split functionality again to get year, month and date separately
		String[] dateTokens = imageDatePart.split("-");
		
		// year is display first, so it is captured at index 0 of the list
		// save this year as the class data member imageFileYear
		this.imageFileYear = dateTokens[0];
		// similarly, month is displayed next, and it is captured at index 1
		// save this month as the class data member imageFileMonth
		this.imageFileMonth = dateTokens[1];
		// day of month is displayed last, and it is captured at index 2
		// save this year as the class data member imageFileDay
		this.imageFileDay = dateTokens[2];
		
		// save the imageName being passed to the method as class member imageFileName
		this.imageFileName = imageName;
		
		// As imageFileName, imageFileYear, imageFileMonth and imageFileDay are being reset with new values
		// calling the method getDerivedImageURL without any parameters will used new values of these variables
		// to create new URL to retrieve image
		return getDerivedImageURL();
	}
}
