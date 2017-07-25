var mapapiid = 'AIzaSyBsJmm8GAuulHcRxYk3X3E5ZYWXObQvEWU';

function generateImageUrl(zoom_value, coordinate) {
    var latlon = coordinate.lat + "," + coordinate.lon;

    return img_url = 'https://maps.googleapis.com/maps/api/staticmap?center='+latlon+'&zoom=' +zoom_value+ '&size=490x340&sensor=false&key=' + mapapiid;

}

function loadGoogleImage(url, dashboard_svg) {
	console.log("adding image")

	var svg = dashboard_svg.append("g").attr("transform", "translate(600,0)");

	    // creating widget
    svg.append("rect").attr("x",0).attr("y",0).attr("rx",10).attr("ry",10)
      .attr("width",550).attr("height", 400)
      .attr("class","widget");

	// adding heading for widget
	svg.append('g')
		.append("text")
		.attr("x", 200)
		.attr("y", 20)
		.attr("class","widget-heading")
		.text('Local Map');

	svg.append("g").attr("id","gmap")
			.append("image").attr("x", 30).attr("y",35)
// 			.attr("width","490"),
// 			.attr("height","360"
			.attr("xlink:href", url);
}