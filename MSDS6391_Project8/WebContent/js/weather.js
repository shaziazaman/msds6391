/**
 * 
 */

var apiid = '0b55e5f12b5583816c9356d808f18249'
/* var mapapiid = 'AIzaSyDcbIf1hGXMTXaAFzSEGz8CHL6zlUs_h9k'; */
var mapapiid = 'AIzaSyBsJmm8GAuulHcRxYk3X3E5ZYWXObQvEWU';

var city = '';
var lat = 0;
var lon = 0;
var condition = '';
var condition = '';
var temp = 0;
var pressure = 0;
var humidity = 0;
var temp_min = 0;
var temp_max = 0;
var wind_speed = 0;
var wind_degree = 0;
var sunrise = 0;
var sunset = 0;
var country = '';
var units = 'imperial'
var temp_scale = 'Fahrenheit'
function gettingJSON(cityName, unitSelected){
	city = cityName;
	units = unitSelected;
	$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + units +'&appid=' + apiid,function(json){
	city = json.name;
	lat = json.coord.lat;
	lon = json.coord.lon;
	condition = json.weather[0].main;
	temp = json.main.temp;
	pressure = json.main.pressure;
	humidity = json.main.humidity;
	temp_min = json.main.temp_min;
	temp_max = json.main.temp_max;
	wind_speed = json.wind.speed;
	wind_degree = json.wind.deg;
	sunrise = json.sys.sunrise;
	sunset = json.sys.sunset;
	country = json.sys.country;
	
	if(units == 'imperial') {
		temp_scale = 'Fahrenheit'
	}
	else if (units == 'metric') {
		temp_scale = 'Celsius'
	}
	
	refreshValuesOnPage();
	showThermometer();
	showMap(12);
})
}

function refreshValuesOnPage() {
	document.getElementById("city").innerHTML = city;
	document.getElementById("temp").innerHTML = temp;
	document.getElementById("pressure").innerHTML = pressure;
	document.getElementById("humidity").innerHTML = humidity;
	document.getElementById("temp_min").innerHTML = temp_min;
	document.getElementById("temp_max").innerHTML = temp_max;
	document.getElementById("wind_speed").innerHTML = wind_speed;
	document.getElementById("wind_degree").innerHTML = wind_degree;
	document.getElementById("sunrise").innerHTML = sunrise;
	document.getElementById("sunset").innerHTML = sunset;
}

function showThermometer() {
	var cvx = document.getElementById("thermocanvas");
	var ctx = cvx.getContext("2d");


	ctx.clearRect(0, 0, cvx.width, cvx.height);

	var thermometer = new RGraph.Thermometer({
        id: 'thermocanvas',
        min: -14,
        max: 120,
        value: temp,
        valueLabelDecimals: 2,
        options: {
            gutterLeft: 25,
            gutterRight: 25,
            colors: ['rgba(255,0,0,1)'],
            bulbBottomRadius: 40,
            titleSide: temp_scale
        }
        
    });
	thermometer.draw();
	
}

function showMap(zoom_value) {
    var latlon = lat + "," + lon;

    var img_url = 'https://maps.googleapis.com/maps/api/staticmap?center='+latlon+'&zoom=' +zoom_value+ '&size=490x340&sensor=false&key=' + mapapiid;

    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}

function getFormattedTime(timeInMilleseconds) {
	var d = new Date(timeInMilleseconds);
	return d.toUTCString();
}

window.onload = function () {
	showThermometer();
	showMap(1);
}