/**
 * D3 practice for weather data
 */

var apiid = '0b55e5f12b5583816c9356d808f18249'
var mapapiid = 'AIzaSyBsJmm8GAuulHcRxYk3X3E5ZYWXObQvEWU';

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

var img_url = '';

function loadWeatherData(cityName, unitSelected) {
	weatherData.city = cityName;
	units = unitSelected;
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

		loadWeatherTable(weatherData);
		loadThermometer(weatherData.temp, weatherData.temp_min, weatherData.temp_max, units);
		img_url = generateImageUrl(12);
    	loadGoogleImage(img_url);
    	loadForecastData();
		loadForecastTable(forecastData);
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

function generateImageUrl(zoom_value) {
    var latlon = weatherData.lat + "," + weatherData.lon;

    return img_url = 'https://maps.googleapis.com/maps/api/staticmap?center='+latlon+'&zoom=' +zoom_value+ '&size=490x340&sensor=false&key=' + mapapiid;

}

function loadGoogleImage(url) {
	console.log("adding image")
	svg = d3.select("body")
			.select("svg#gmap")
			.append("image")
			.attr("width","490")
			.attr("height","360")
			.attr("xlink:href", url);
}

function loadWeatherTable(data) {
	console.log("adding table");

	//transpose data as array
	var transposeData = transposeWeatherDataIntoArray(weatherData);

	//get column list
	var columns = Object.keys(transposeData[0]);

	// remove table before appending new table
	d3.select("body").select("div#wtable").selectAll("table").remove();

	// add new table
	var table = d3.select("body").select("div#wtable").append("table");

	var thead = table.append("thead");
	var tbody = table.append("tbody");

	thead.append('tr')
		  .selectAll('th')
		  .data(columns).enter()
		  .append('th')
		    .text(function (column) { return column; });

	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
	  .data(transposeData)
	  .enter()
	  .append('tr');

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
	  .data(function (row) {
		return columns.map(function (column) {
		  return {column: column, value: row[column]};
		});
	  })
	  .enter()
	  .append('td')
		.text(function (d) { return d.value; });
}

function transposeWeatherDataIntoArray(data) {
	var tdata = [];
	var types = Object.keys(data);

	for(i=0; i < types.length; i++) {
		var type = types[i];
		var value = data[type];
		var obj = {};
		obj.Type = type;
		obj.Value = value;
		tdata.push(obj);
	}
	console.log(tdata);
	return tdata;
}

function loadForecastTable(data) {

	// remove table before appending new table
	d3.select("body").select("div#ftable").selectAll("table").remove();

	// add new table
	var table = d3.select("body").select("div#ftable").append("table");

	var thead = table.append("thead");
	var tbody = table.append("tbody");

	thead.append('tr')
		  .selectAll('th')
		  .data(['day1','day2','day3', 'day4', 'day5']).enter()
		  .append('th')
		    .text(function (column) { return column; });
}
