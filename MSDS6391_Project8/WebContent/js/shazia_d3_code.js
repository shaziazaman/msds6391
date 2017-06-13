/**
 * D3 practice for weather data
 */

var apiid = '0b55e5f12b5583816c9356d808f18249'

var weatherData = {};
weatherData.city = 'Dallas';
weatherData.lat = 0;
weatherData.lon = 0;
weatherData.condition = '';
weatherData.temp = 0;
weatherData.pressure = 0;
weatherData.humidity = 0;
weatherData.temp_min = 0;
weatherData.temp_max = 0;
weatherData.wind_speed = 0;
weatherData.wind_degree = 0;
weatherData.sunrise = 0;
weatherData.sunset = 0;
weatherData.country = '';
units = 'imperial'
temp_scale = 'Fahrenheit'

var forecastData = {};
forecastData.city = 'Dallas';
forecastData.lat = 0;
forecastData.lon = 0;
forecastData.country = '';
forecastData.days = [];

function loadWeatherData() {
d3.json('http://api.openweathermap.org/data/2.5/weather?q=' + weatherData.city + '&units=' + units +'&appid=' + apiid, function (jsondata) {
    
		console.log(jsondata);

		weatherData.city = jsondata.name;
		weatherData.lat = jsondata.coord.lat;
		weatherData.lon = jsondata.coord.lon;
		weatherData.condition = jsondata.weather[0].main;
		weatherData.temp = jsondata.main.temp;
		weatherData.pressure = jsondata.main.pressure;
		weatherData.humidity = jsondata.main.humidity;
		weatherData.temp_min = jsondata.main.temp_min;
		weatherData.temp_max = jsondata.main.temp_max;
		weatherData.wind_speed = jsondata.wind.speed;
		weatherData.wind_degree = jsondata.wind.deg;
		weatherData.sunrise = jsondata.sys.sunrise;
		weatherData.sunset = jsondata.sys.sunset;
		weatherData.country = jsondata.sys.country;

    });
}

function loadForecastData() {
d3.json('http://api.openweathermap.org/data/2.5/forecast?q=' + forecastData.city + '&units=' + units +'&appid=' + apiid, function (jsondata) {
    
		console.log(jsondata);

		forecastData.city = jsondata.city.name;
		forecastData.country = jsondata.city.country;
		forecastData.lat = jsondata.city.coord.lat;
		forecastData.lon = jsondata.city.coord.lon;
		// Need to loop through the list and add flatten out data
		// to forecastData list
//		forecastData.days = jsondata.list;
    });
}

