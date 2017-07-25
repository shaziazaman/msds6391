// Reference: http://bl.ocks.org/tomgp/6475678

var timezoneapiid = 'AIzaSyDefPXemHwxIfnWIg7D2ZpZdq7fjiXvUBc';
var radians = 0.0174532925;
var clockRadius = 80;
var clockMargins = 15;
var clockWidth = (clockRadius+clockMargins)*2;
var clockHeight = (clockRadius+clockMargins)*2;
var sunriseHandLength = 2*clockRadius/3;
var sunsetHandLength = 2*clockRadius/3;
var hourTickStart = clockRadius + 10;
var hourTickLength = -1;
var hourLabelRadius = clockRadius - 10;
var hourLabelYOffset = 7;

var hourScale = d3.scale.linear()
	.range([0,354])
	.domain([0,24]);

var handData = [
	{
		type:'sunrise-hour',
		value:0,
		length:-sunriseHandLength,
		scale:hourScale
	},
	{
		type:'sunset-hour',
		value:0,
		length:-sunsetHandLength,
		scale:hourScale
	}
];

var radioLabels = ['Table','Clock'];

function displayClockOrTable(data, coordinate, dashboard_svg){

	var latlon = coordinate.lat + ',' + coordinate.lon;
	var timeInSecond = data.time;
	var svg = dashboard_svg.append("g");
	svg.attr("id","clock").attr("transform","translate(335,0)");
	
	d3.json('https://maps.googleapis.com/maps/api/timezone/json?location='+latlon+'&timestamp='+timeInSecond+'&key='+timezoneapiid,function (jsondata) {
		console.log('timezone data', jsondata);
		var offset = {};
		offset.dst = jsondata.dstOffset;
		offset.raw = jsondata.rawOffset;

		console.log('offset data', offset);
		drawDayLightClock(data, offset, svg);
	});

}


function convertToUTCDateString(dateNumber, offset) {
	var timeData =  convertToUTCDate(dateNumber, offset);
	var pad = '00';
	return (pad + timeData.hours).slice(-2) + ":" + (pad + timeData.minutes).slice(-2) + ":" + (pad + timeData.seconds).slice(-2);
}

function convertToUTCDate(dateNumber, offset) {
	var timeData = {};
	var convertedDate =  new Date(dateNumber * 1000);
	convertedDate.setTime( convertedDate.getTime() + (offset.raw + offset.dst)*1000 );
	timeData.hours = convertedDate.getUTCHours();
	timeData.minutes = convertedDate.getUTCMinutes();
	timeData.seconds = convertedDate.getUTCSeconds();

	console.log('time data', timeData);

	return timeData;
}

function drawDayLightClock(data, offset, svg) {

	    // creating widget
   svg.append("rect").attr("x",0).attr("y",0).attr("rx",10).attr("ry",10)
      .attr("width",clockWidth+70).attr("height", 400)
      .attr("class","widget");

	// adding heading for widget
	svg.append('g')
		.append("text")
		.attr("x", 30)
		.attr("y", 25)
		.attr("class","widget-heading")
		.text('Sunrise and Sunset Time');

    var face = svg.append('g')
		.attr('id','clock_face')
		.attr('transform','translate(' + (clockRadius + clockMargins + 30) + ',' + (clockRadius + clockMargins + 50) + ')');

	face.selectAll('.hour-tick')
		.data(d3.range(0,24)).enter()
			.append('line')
			.attr('class', 'hour-tick')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',hourTickStart)
			.attr('y2',hourTickStart + hourTickLength)
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			});

	face.selectAll('.hour-label')
		.data(d3.range(3,25,3))
			.enter()
			.append('text')
			.attr('class', 'hour-label')
			.attr('text-anchor','middle')
			.attr('x',function(d){
				return hourLabelRadius*Math.sin(hourScale(d)*radians);
			})
			.attr('y',function(d){
				return -hourLabelRadius*Math.cos(hourScale(d)*radians) + hourLabelYOffset;
			})
			.text(function(d){
				return d;
			});

	face.append('g').attr('id','face-overlay')
		.append('circle').attr('class','hands-cover')
			.attr('x',0)
			.attr('y',0)
			.attr('r',clockRadius/20);

	var hands = face.append('g').attr('id','clock-hands');

	hands.selectAll('line')
		.data(handData)
		.enter()
		.append('line')
		.attr('class', function(d){
			return d.type + '-hand';
		})
		.attr('x1',0)
		.attr('y1',function(d){
			return d.balance ? d.balance : 0;
		})
		.attr('x2',0)
		.attr('y2',function(d){
			return d.length;
		})
		.attr('transform',function(d){
			return 'rotate('+ d.scale(d.value) +')';
		});

		loadClockTableGroup(data, offset, svg);

		updateClockData(data, offset);
		moveClockHands();
}

function moveClockHands(){
	d3.select('#clock-hands').selectAll('line')
	.data(handData)
		.transition()
		.attr('transform',function(d){
			return 'rotate('+ d.scale(d.value) +')';
		});
}

function updateClockData(data, offset){
	sunrise = convertToUTCDate(data.sunrise, offset);
	sunset = convertToUTCDate(data.sunset, offset);
	handData[0].value = sunrise.hours + sunrise.minutes/60;
	handData[1].value = sunset.hours + sunset.minutes/60;
}

function loadClockTableGroup(data, offset, svg) {
	var tableGroup = svg.append('g').attr('id','clock_table')
						.attr("transform","translate(15, " + (clockHeight + 100) + ")");

	var time = {};
	time.monitor_time = convertToUTCDateString(data.time, offset);
	time.sunrise_time = convertToUTCDateString(data.sunrise, offset);
	time.sunset_time = convertToUTCDateString(data.sunset, offset);
	
    tableGroup.append("text")
 				.attr("x", 15)
    			.attr("y", 0)
    			.text('Sunrise Time: ' + time.sunrise_time);

   tableGroup.append("text")
 				.attr("x", 15)
    			.attr("y", 25)
    			.text('Sunset Time: ' + time.sunset_time);			
}

function loadClockTable(data, offset) {
	console.log("adding table");
	d3.select("body").select("#clock_table").remove();
	
	var table = d3.select("body").select("div#clock").append("table").attr('id','clock_table');
	
	var time = {};
	time.monitor_time = convertToUTCDateString(data.time, offset);
	time.sunrise_time = convertToUTCDateString(data.sunrise, offset);
	time.sunset_time = convertToUTCDateString(data.sunset, offset);

	//transpose data as array
	var transposeTimeData = transposeWeatherDataIntoArray(time);

	//get column list
	var columns = Object.keys(transposeTimeData[0]);

	var thead = table.append("thead");
	var tbody = table.append("tbody");

	thead.append('tr')
		  .selectAll('th')
		  .data(columns).enter()
		  .append('th')
		    .text(function (column) { return column; });

	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
	  .data(transposeTimeData)
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

function transposeClockDataIntoArray(data) {
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
	console.log('clockDataTransposed', tdata);
	return tdata;
}