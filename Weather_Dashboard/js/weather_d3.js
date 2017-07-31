/**
 * D3 script for weather data
 */

var apiid = '0b55e5f12b5583816c9356d808f18249'

var weatherData = {};
weatherData.city = 'Dallas';
weatherData.country = 'US';
weatherData.condition = '';
weatherData.temp_max = 0;
weatherData.temperature = 0;
weatherData.temp_min = 0;
weatherData.pressure = 0;
weatherData.humidity = 0;
weatherData.wind_speed = 0;
weatherData.wind_degree = 0;

units = 'imperial'
temp_scale = 'Fahrenheit'

var forecastData = {};
forecastData.city = 'Dallas';
forecastData.country = 'US';
forecastData.days = [];
forecastData.cnt = 0;

function loadWeatherData(cityName, unitSelected) {
	units = unitSelected;

	d3.select("body").select("div#dashboard").select("svg").remove();
	var svg = d3.select("body").select("div#dashboard").append("svg").attr('width',1170).attr('height',890)
	.attr("transform","translate(50,50)")
	.attr("class","widget1");
	
	var chart_svg = svg.append("g").attr("transform","translate(10,10)");
	var monitor_svg = svg.append("g").attr("transform","translate(10,480)");
	
	d3.json('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=' + units +'&appid=' + apiid, function (jsondata) {
    
		console.log("weather jsonData from API", jsondata);

		var coordinate = {};
		coordinate.lat = jsondata.coord.lat;
		coordinate.lon = jsondata.coord.lon;
		console.log('coorindate', coordinate);
		
		var clockTime = {};
		clockTime.time = jsondata.dt;
		clockTime.sunrise = jsondata.sys.sunrise;
		clockTime.sunset = jsondata.sys.sunset;
		console.log('clockTime', clockTime);
		
		weatherData.city = jsondata.name;
		weatherData.country = jsondata.sys.country;
		weatherData.condition = jsondata.weather[0].main;
		weatherData.temperature = jsondata.main.temp;
		weatherData.temp_min = jsondata.main.temp_min;
		weatherData.temp_max = jsondata.main.temp_max;
		weatherData.pressure = jsondata.main.pressure;
		weatherData.humidity = jsondata.main.humidity;
		weatherData.wind_speed = jsondata.wind.speed;
		weatherData.wind_degree = jsondata.wind.deg;
		console.log("weatherData",weatherData);
// 		loadWeatherTable(weatherData);
		loadWeatherTableSVG(weatherData, monitor_svg);
		
    	loadThermometer(weatherData.temperature, weatherData.temp_min, weatherData.temp_max, units, chart_svg);
		
		displayClockOrTable(clockTime, coordinate, monitor_svg);
		
		var img_url = generateImageUrl(12, coordinate);
    	loadGoogleImage(img_url, monitor_svg);

    });

	var graph_svg = chart_svg.append("g").attr("transform","translate(125,0)");
    loadForecastData(cityName, graph_svg); 
    loadMonthlyAverageData(cityName, coordinate.lat, coordinate.lon, graph_svg);

}

function loadForecastData(cityName, forecast_svg) {
	d3.json('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=' + units +'&appid=' + apiid, function (jsondata) {
    
		console.log("forecast jsondata from API", jsondata);

		forecastData.city = jsondata.city.name;
		forecastData.country = jsondata.city.country;
		forecastData.cnt = jsondata.cnt;
		forecastData.days = [];
		for (i = 0; i < forecastData.cnt; i++) { 
			var obj = {};
			obj.dt = jsondata.list[i].dt;
			obj.dt_txt = jsondata.list[i].dt_txt;
			obj.temp = jsondata.list[i].main.temp;
			forecastData.days.push(obj);
		}

		console.log("forecastData",forecastData);

// 		loadForecastTable(forecastData.days);
    	generateAndLoadLineChart(forecastData.days, forecast_svg);

		
    });
}

function loadMonthlyAverageData( cityName,coordinatelat, coordinatelon, dashboard_svg) {
	var d = new Date("2015-03-25T12:00:00Z");
	d3.json('http://api.openweathermap.org/pollution/v1/co/' + coordinatelat, coordiantelon + d + apiid), function (jsondata){
	// api for CO
	//http://api.openweathermap.org/pollution/v1/co/0.0,10.0/2016-01-02T15:04:05Z.json?appid={your-api-key}
	    pollutionData.cnt = jsondata.cnt;
		PollutionData = [];
		for (i = 0; i < pollutionData.cnt; i++) { 
			var obj = {};
			obj.value = jsondata.list[i].data.value;
			obj.pressure = jsondata.list[i].data.pressure;
			obj.precision = jsondata.list[i].data.precision;
			PollutionData.push(obj);
		}
	}
	//var averageData = {};
	generateMonthlyAverageChart(PollutionData, dashboard_svg);
}







