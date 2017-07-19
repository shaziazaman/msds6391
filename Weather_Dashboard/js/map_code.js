var mapapiid = 'AIzaSyBsJmm8GAuulHcRxYk3X3E5ZYWXObQvEWU';

function generateImageUrl(zoom_value, coordinate) {
    var latlon = coordinate.lat + "," + coordinate.lon;

    return img_url = 'https://maps.googleapis.com/maps/api/staticmap?center='+latlon+'&zoom=' +zoom_value+ '&size=490x340&sensor=false&key=' + mapapiid;

}

function loadGoogleImage(url, dashboard_svg) {
	console.log("adding image")
	var svg = dashboard_svg.append("g");
	svg.attr("id","gmap").attr("transform", "translate(400,0)")
			.append("image")
// 			.attr("width","490")
// 			.attr("height","360")
			.attr("xlink:href", url);
}