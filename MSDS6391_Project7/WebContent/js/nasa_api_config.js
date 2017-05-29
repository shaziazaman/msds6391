/**
 * NASA API configuration
 */

var apiKey = "?api_key=9Ihs7mZs2OkFpVeNHaRF76mnDZ02lOSZoe2NIeeh";
var apiBaseUrl = "https://api.nasa.gov/EPIC/api/natural/images";
var apiDateUrl = "https://api.nasa.gov/EPIC/api/natural/date/";
var apiAllDatesUrl = "https://api.nasa.gov/EPIC/api/natural/all";
var imageType = "natural";
var imageFileType = "png";
var imageFileName = "epic_1b_20170510190006_02";
var imageFileYear = "2017";
var imageFileMonth = "05";
var imageFileDay = "10";
var imageBaseUrl = "https://api.nasa.gov/EPIC/archive/";

// This method will be used to get all the available dates when images are captured
function getAllAvailableDates() {
	return apiAllDatesUrl + apiKey;
}

// This method will be used to generate apiURL to retrieve information about
// lated images of Earth being captured by NASA
function getDerivedApiURL() {
	return apiBaseUrl + apiKey;
}

// Method overloading for getDerivedApiURL with extra parameter
// This method will be used to generate apiURL to retrieve information about
// images of Earth being captured by NASA being captured on requested date 
function getDerivedApiURL(dateString) {
		return apiDateUrl + dateString + apiKey;
}

// This method will be used to generate image URL based on the class data members
// that is already being set in the class
function getDerivedImageURL() {
	// create image URL based on parameter being set in class
	return imageBaseUrl + imageType + "/" +
			imageFileYear + "/" + imageFileMonth + "/" + imageFileDay + "/" +
			imageFileType + "/" + imageFileName + "." + imageFileType + apiKey;
}

// Method overloading for getDerivedImageURL with extra parameters
// This method will be used to reset the image Date and File name information
// And then generate new image URL based on these variables

function getDerivedImageURL(imageDateString, imageName) {
	// imageDateString is given in format as 2017-05-10 22:11:41
	// date and time part are separated by white space
	
	// use split functionality to break date string into date part and time part
	var dateTimeToken = imageDateString.split(" ");
	// capture the date part only for further processing
	var imageDatePart = dateTimeToken[0];
	
	// in date part, year, month and date are separated by -
	// use split functionality again to get year, month and date separately
	var dateTokens = imageDatePart.split("-");
	
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
