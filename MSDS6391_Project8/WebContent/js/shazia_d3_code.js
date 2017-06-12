/**
 * D3 practice for weather data
 */

var apiid = '0b55e5f12b5583816c9356d808f18249'
var city = 'Dallas';
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

function loadData() {
d3.json('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + units +'&appid=' + apiid, function (json) {
    
	console.log(json);

    });

}

