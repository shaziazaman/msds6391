	// define dimensions of graph
	  var p_m = {top: 0, right: 50, bottom: 200, left: 50}; // margins
	  var p_w = 1000 - m.left - m.right; // width
	  var p_h = 300 - m.top - m.bottom; // height
	  
	  var p_x_dim_accessor = function(d){return d.pressure};
	  var p_y_dim_accessor = function(d){return d.value};

	  var p_x_range;
	  var p_y_range;
	


// function generatePollutionChart(data, dashboard_svg) {
// 	var svg = dashboard_svg.append("g").attr("transform", "translate(0,235)");

// 	    // creating widget
//     svg.append("rect").attr("x",0).attr("y",0).attr("rx",10).attr("ry",10)
//       .attr("width",1020).attr("height", 230)
//       .attr("class","widget");

// 	// adding heading for widget
// 	svg.append('g')
// 		.append("text")
// 		.attr("x", 400)
// 		.attr("y", 25)
// 		.attr("class","widget-heading")
// 		.text('Pollution Chart');

// }

	  // plot with data json array passed, we'll plot with a line (this array represents only the Y values, X will just be the index location)

function generatePollutionChart(data, dashboard_svg){

		p_x_range = [
	      d3.min(data, p_x_dim_accessor),
	      d3.max(data, p_x_dim_accessor)
	    ];

	    p_y_range = [
	      d3.min(data, p_y_dim_accessor),
	      d3.max(data, p_y_dim_accessor)
	    ];

		var data2 = data.sort(function(a,b){
	      return x_dim_accessor(a) - x_dim_accessor(b);
	    });

	    var svg = dashboard_svg.append("g").attr("transform", "translate(0,235)");;

	    // creating widget
    svg.append("rect").attr("x",0).attr("y",0).attr("rx",10).attr("ry",10)
      .attr("width",p_w+120).attr("height",p_h+130)
      .attr("class","widget");

    svg.append("text").attr("x",((p_w - 30)/2)).attr("y",25)
    			.attr("class","widget-heading").text('Air Pollution Chart');
	   
	render_bar(data2, svg);

}

function render_bar(data, dashboard_svg){
    
    // X scale will fit all values from data[] within pixels 0-w
    var x = d3.scale.linear().domain(p_x_range).range([0, p_w]);
    // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
    var y = d3.scale.linear().domain(p_y_range).range([p_h, 0]);
      // automatically determining max range can work something like this
      // var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

    // create a line function that can convert data[] into x and y points
    var line = d3.svg.line()
      // assign the X function to plot our line as we wish
      .x(function(d,i) { 
        return x(p_x_dim_accessor(d)); 
      })
      .y(function(d) { 
        return y(p_y_dim_accessor(d)); 
      })
	  

	  
      // Add an SVG element with the desired dimensions and margin.
      var graph = dashboard_svg.append("g").attr('id','pollution-chart')
      		.attr("transform", "translate(30,0)")
            .attr("width", w + m.left + m.right)
            .attr("height", h + m.top + m.bottom)
          .append("svg:g")
            .attr("transform", "translate(" + m.left + "," + m.right+ ")");

      graph.append("text").style("font-size", "16px");
	
      var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
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
      
      //Bar Chart
      //svg.selectAll("bar")
      //.data(data)
      //.enter().append("rect")
      //.style("fill", "steelblue")
      //.attr("x", function(d) { return x(d.pressure); })
      //.attr("width", x.rangeBand())
      //.attr("y", function(d) { return y(d.value); })
      //.attr("height", function(d) { return height - y(d.value); });


        // Add the line by appending an svg:path element with the data line we created above
      // do this AFTER the axes above so that the line is above the tick-lines
      graph.append("svg:path").attr("d", line(data));
		
  }

