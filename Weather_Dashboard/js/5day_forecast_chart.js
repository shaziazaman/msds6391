
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

	    var svg = dashboard_svg.append("g");

	    // creating widget
    svg.append("rect").attr("x",0).attr("y",0).attr("rx",10).attr("ry",10)
      .attr("width",w+120).attr("height", h+130)
      .attr("class","widget");

    var textsvg = svg.append("text").attr("x",((w - 250)/2)).attr("y",25)
    			.attr("class","widget-heading").text('Five Day Temperature Forecast');
	    
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
      		.attr("transform", "translate(30,0)")
            .attr("width", w + m.left + m.right)
            .attr("height", h + m.top + m.bottom)
          .append("svg:g")
            .attr("transform", "translate(" + m.left + "," + m.right+ ")");

      graph.append("text");
	
	  // get datatime labels for x-axis
	  var x_labels = data.map(function(d) {return d.dt_txt.substring(5,13);});
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

      // adding axis titles
  	graph.append("text")
            .attr("text-anchor", "left")  
            .attr("transform", "translate(-70,-10)")  
            .text("Temperature");

    graph.append("text")
            .attr("text-anchor", "left")  
            .attr("transform", "translate(-40,130)")  
            .append('tspan').text("Date").attr('x',0).attr('y',0)
            .append('tspan').text(" & ").attr('x',5).attr('y',15)
            .append('tspan').text("Hour").attr('x',0).attr('y',30)
		
  }

