function generateMonthlyAverageChart(data, dashboard_svg) {
	var svg = dashboard_svg.append("g").attr("transform", "translate(0,235)");

	    // creating widget
    svg.append("rect").attr("x",0).attr("y",0).attr("rx",10).attr("ry",10)
      .attr("width",1020).attr("height", 230)
      .attr("class","widget");

	// adding heading for widget
	svg.append('g')
		.append("text")
		.attr("x", 400)
		.attr("y", 25)
		.attr("class","widget-heading")
		.text('Monthly Average Temperature');

}