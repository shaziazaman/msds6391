// define dimensions of graph
  var p_m = {top: 0, right: 50, bottom: 200, left: 50}; // margins
  var p_w = 1000 - m.left - m.right; // width
  var p_h = 300 - m.top - m.bottom; // height

  var p_x_dim_accessor = function(d){return d.pressure};
  var p_y_dim_accessor = function(d){return d.value};

  var p_x_range;
  var p_y_range;
	
function formatAndSortData(data) {
	var data2 = data.sort(function(a,b){
	      return d3.ascending(a.pressure, b.pressure);
	    }); 

	 for (i = 0; i < data2.length; i++) { 
			data2[i].pressure = data2[i].pressure.toFixed(5);
// 			data2[i].value = data2[i].value.toExponential();
		}
	 return data2;
}

function generatePollutionChart(data, dashboard_svg){

		var data2 = formatAndSortData(data);
		console.log("pollution data", data2);
		
		p_x_range = [
	      d3.min(data2, p_x_dim_accessor),
	      d3.max(data2, p_x_dim_accessor)
	    ];
		console.log("x range", p_x_range);
	    p_y_range = [
	      d3.min(data2, p_y_dim_accessor),
	      d3.max(data2, p_y_dim_accessor)
	    ];
		console.log("y range", p_y_range);
		
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

      // Add an SVG element with the desired dimensions and margin.
      var graph = dashboard_svg.append("g").attr('id','pollution-chart')
      		.attr("transform", "translate(30,0)")
            .attr("width", p_w + p_m.left + p_m.right)
            .attr("height", p_h + p_m.top + p_m.bottom)
          .append("svg:g")
            .attr("transform", "translate(" + p_m.left + "," + p_m.right+ ")");

      graph.append("text").style("font-size", "16px");

      var x = d3.scale.ordinal().domain(p_x_range).rangeBands([0, p_w]);
	  x.domain(data.map(p_x_dim_accessor));
  	
  	  // create x-Axis
      var xAxis = d3.svg.axis().scale(x);      
	
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


   	var y = d3.scale.linear().domain(p_y_range).range([p_h, 0]);
   	console.log("y", y);
	  // create left yAxis
      var yAxisLeft = d3.svg.axis().scale(y).ticks(6).orient("left");
      // Add the y-axis to the left
      graph.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(-25,0)")
            .call(yAxisLeft);
      
	y.domain(p_y_range);

		console.log("rangeBand", x.rangeBand);
      //Bar Chart
       graph
       .selectAll("bar")
      .data(data)
      .enter().append("rect")
      .attr("class", function(d){return d.value < 0 ? "negative" : "positive";})
//       .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.pressure); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return p_h - y(d.value); });
		
  }

