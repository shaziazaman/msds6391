/**
 * 
 */

var apiid = '0b55e5f12b5583816c9356d808f18249'
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
function gettingJSON(cityName){
	city = cityName;
	$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiid,function(json){
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
	
	refreshValuesOnPage();
})
}

function refreshValuesOnPage() {
	document.getElementById("city").innerHTML = city;
	document.getElementById("lat").innerHTML = lat;
	document.getElementById("lon").innerHTML = lon;
}
