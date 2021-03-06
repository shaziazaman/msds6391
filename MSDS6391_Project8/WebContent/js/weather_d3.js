/**
 * D3 script for weather data
 */

var apiid = '0b55e5f12b5583816c9356d808f18249'
var mapapiid = 'AIzaSyBsJmm8GAuulHcRxYk3X3E5ZYWXObQvEWU';

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
		loadWeatherTable(weatherData);

    	loadThermometer(weatherData.temperature, weatherData.temp_min, weatherData.temp_max, units);
		
		displayClockOrTable(clockTime, coordinate);
		
		var img_url = generateImageUrl(12, coordinate);
    	loadGoogleImage(img_url);
    });

    loadForecastData(cityName);

}

function loadForecastData(cityName) {
	d3.json('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=' + units +'&appid=' + apiid, function (jsondata) {
    
		console.log("forecast jsondata from API", jsondata);

		forecastData.city = jsondata.city.name;
		forecastData.country = jsondata.city.country;
		forecastData.cnt = jsondata.cnt;
		forecastData.days = [];
		for (i = 0; i < forecastData.cnt; i++) { 
			var obj = {};
			obj.dt = jsondata.list[i].dt;
			//Library to convert date format
			//obj.dt = moment.unix(obj.dt).format('LLL');
			obj.dt_txt = jsondata.list[i].dt_txt;
			obj.temp = jsondata.list[i].main.temp;
			forecastData.days.push(obj);
		}

		console.log("forecastData",forecastData);

// 		loadForecastTable(forecastData.days);
    	generateAndLoadLineChart(forecastData.days);

		
    });
}

function generateImageUrl(zoom_value, coordinate) {
    var latlon = coordinate.lat + "," + coordinate.lon;

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
	var transposeData = transposeWeatherDataIntoArray(data);

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
	console.log('weatherDataTransposed', tdata);
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
		  .data(['dt_txt','temp']).enter()
		  .append('th')  
		    .text(function (column) { return column; });
	// create rows
    var tr = tbody.selectAll("tr")
    .data(data).enter().append("tr")

     // creates cells
   var td = tr.selectAll("td")
  .data(function(d){return d3.values(d)})
  .enter().append("td")
  .text(function(d) {return d})
   
 
}

function generateAndLoadLineChart(data){
	//use following line to add graph to div#linechart
	
	// define dimensions of graph
	  var m = {top: 0, right: 50, bottom: 200, left: 50}; // margins
	  var w = 1000 - m.left - m.right; // width
	  var h = 300 - m.top - m.bottom; // height
	  
	  var x_dim_accessor = function(d){return d.dt};
	  var y_dim_accessor = function(d){return d.temp};

	  var x_range;
	  var y_range;
	
	  // plot with data json array passed, we'll plot with a line (this array represents only the Y values, X will just be the index location)

	    x_range = [
	      d3.min(data, x_dim_accessor),
	      d3.max(data, x_dim_accessor)
	    ];

	    y_range = [
	      d3.min(data, y_dim_accessor),
	      d3.max(data, y_dim_accessor)
	    ];

		var data2 = data.sort(function(a,b){
	      return x_dim_accessor(a) - x_dim_accessor(b);
	    });
	    
	    render(data2,x_range,y_range,m,w,h,x_dim_accessor,y_dim_accessor);

}

function render(data,x_range,y_range,m,w,h,x_dim_accessor,y_dim_accessor){
    
    // X scale will fit all values from data[] within pixels 0-w
    var x = d3.scale.linear().domain(x_range).range([0, w]);
    // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
    var y = d3.scale.linear().domain(y_range).range([h, 0]);
      // automatically determining max range can work something like this
      // var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

    // create a line function that can convert data[] into x and y points
    var line = d3.svg.line()
      // assign the X function to plot our line as we wish
      .x(function(d,i) { 
        return x(x_dim_accessor(d)); 
      })
      .y(function(d) { 
        return y(y_dim_accessor(d)); 
      })
	  
	  // Remove previous graphs
	  d3.select("div#linechart").selectAll("svg").remove();
	  
      // Add an SVG element with the desired dimensions and margin.
      var graph = d3.select("div#linechart").append("svg:svg")
            .attr("width", w + m.left + m.right)
            .attr("height", h + m.top + m.bottom)
          .append("svg:g")
            .attr("transform", "translate(" + m.left + "," + m.right+ ")");

      graph.append("text").style("font-size", "16px").text("Five Day Forecast");
	
	  // get datatime labels for x-axis
	  var x_labels = data.map(function(d) {return d.dt_txt.substring(0,13);});
      // create yAxis
      var x_txt = d3.scale.ordinal()
    			.domain(x_labels)
    			.rangePoints([0, w]);

      var xAxis = d3.svg.axis().scale(x_txt);
//       var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
      // Add the x-axis.
      graph.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis)
            .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-90)" 
                });;


      // create left yAxis
      var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
      // Add the y-axis to the left
      graph.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(-25,0)")
            .call(yAxisLeft);
      
        // Add the line by appending an svg:path element with the data line we created above
      // do this AFTER the axes above so that the line is above the tick-lines
      graph.append("svg:path").attr("d", line(data));
		
  }
