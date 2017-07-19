
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

function generateAndLoadLineChart(data, dashboard_svg){
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
	    
	    render(data2, dashboard_svg);

}

function render(data, dashboard_svg){
    
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
	  
	  
	  
      // Add an SVG element with the desired dimensions and margin.
      var graph = dashboard_svg.append("g").attr('id','5-day-chart')
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
