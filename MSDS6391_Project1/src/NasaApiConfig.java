
public class NasaApiConfig {
	String apiKey = "9Ihs7mZs2OkFpVeNHaRF76mnDZ02lOSZoe2NIeeh";
	String apiUrl = "https://api.nasa.gov/EPIC/api/natural/images?api_key=" + apiKey;
	String imageType = "natural";
	String imageFileType = "png";
	String imageFileName = "epic_1b_20170510190006_02";
	String imageFileYear = "2017";
	String imageFileMonth = "05";
	String imageFileDay = "10";
	String imageUrl = "https://api.nasa.gov/EPIC/archive/" + imageType + "/" +
			imageFileYear + "/" + imageFileMonth + "/" + imageFileDay + "/" +
			imageFileType + "/" + imageFileName + "." + imageFileType + 
			"?api_key=" + apiKey;
	
	public NasaApiConfig() {
		super();
	}
	
}
