var width = 100,
    height = 365,
    maxTemp = 0,
    minTemp = 0,
    currentTemp = 0;

var bottomY = height - 5,
    topY = 5,
    bulbRadius = 30,
    tubeWidth = 25.5,
    tubeBorderWidth = 1;

var bulb_cy = bottomY - bulbRadius,
    bulb_cx = width/2,
    top_cy = topY + tubeWidth/2;

var celsius_range = [-10,50],
    fahrenheit_range = [-20,120],
    temp_units = "imperial";
    
function loadThermometer(temp, min_temp, max_temp, units, dashboard_svg) {
    console.log("adding thermometer")
    currentTemp = temp;
    minTemp = min_temp;
    maxTemp = max_temp;
    temp_units = units;
    var widgetsvg = dashboard_svg.append("g");

    widgetsvg.attr('id','thermo');
   
    // creating widget
    widgetsvg.append("rect").attr("x",0).attr("y",0).attr("rx",10).attr("ry",10)
      .attr("width",width+20).attr("height", height+100)
      .attr("class","widget");

    var textsvg = widgetsvg.append("text").attr("x",15).attr("y",25).attr("class","widget-heading");
    textsvg.append("tspan").text("Current").attr("x",20).attr("dy",15);
    textsvg.append("tspan").text("  ").attr("x",20).attr("dy",15);
    textsvg.append("tspan").text("Temperature").attr("x",15).attr("dy",15);

    
    var svg = widgetsvg.append("g").attr("transform","translate(10, 90)");

  // Circle element for rounded tube top
  svg.append("circle")
    .attr("r", tubeWidth/2)
    .attr("cx", width/2)
    .attr("cy", top_cy)
    .attr('class','tub');


  // Rect element for tube
  svg.append("rect")
    .attr("x", width/2 - tubeWidth/2)
    .attr("y", top_cy)
    .attr("height", bulb_cy - top_cy)
    .attr("width", tubeWidth)
    .attr('class','tub');


  // White fill for rounded tube top circle element
  // to hide the border at the top of the tube rect element
  svg.append("circle")
    .attr("r", tubeWidth/2 - tubeBorderWidth/2)
    .attr("cx", width/2)
    .attr("cy", top_cy)
    .attr('class', 'tub');



  // Main bulb of thermometer (empty), white fill
  svg.append("circle")
    .attr("r", bulbRadius)
    .attr("cx", bulb_cx)
    .attr("cy", bulb_cy)
    .attr('class','tub');


  // Rect element for tube fill colour
  svg.append("rect")
    .attr("x", width/2 - (tubeWidth - tubeBorderWidth)/2)
    .attr("y", top_cy)
    .attr("height", bulb_cy - top_cy)
    .attr("width", tubeWidth - tubeBorderWidth)
    .attr('class', 'tub')
    .style("stroke", "none");


  var domain = fahrenheit_range;
  var step = 10;

  if(temp_units == "metric"){
    domain = celsius_range;
    step = 5;
  }

  // D3 scale object
  var scale = d3.scale.linear()
    .range([bulb_cy - bulbRadius/2 - 8.5, top_cy])
    .domain(domain);


  // Max and min temperature lines
  [minTemp, maxTemp].forEach(function(t) {

    var isMax = (t == maxTemp),
        label = (isMax ? "max" : "min"),
        textOffset = (isMax ? -4 : 4);

    svg.append("line")
      .attr("id", label + "Line")
      .attr("x1", width/2 - tubeWidth/2)
      .attr("x2", width/2 + tubeWidth/2 + 22)
      .attr("y1", scale(t))
      .attr("y2", scale(t)).attr('class','tub');

    svg.append("text")
      .attr('class', 'widget-text')
      .attr("x", width/2 + tubeWidth/2 + 2)
      .attr("y", scale(t) + textOffset)
      .attr("dy", isMax ? null : "0.75em")
      .text(label)
      .attr('class', function(){return isMax? "max" : "min";});
  });


  var tubeFill_bottom = bulb_cy,
      tubeFill_top = scale(currentTemp);

  // Rect element for the red mercury column
  svg.append("rect")
    .attr("x", width/2 - (tubeWidth - 10)/2)
    .attr("y", tubeFill_top)
    .attr("width", tubeWidth - 10)
    .attr("height", tubeFill_bottom - tubeFill_top)
    .attr('class', 'mercury');


  // Main thermometer bulb fill
  svg.append("circle")
    .attr("r", bulbRadius - 6)
    .attr("cx", bulb_cx)
    .attr("cy", bulb_cy)
    .attr('class','mercury');


  // Values to use along the scale ticks up the thermometer
  var tickValues = d3.range((domain[1] - domain[0])/step + 1).map(function(v) { return domain[0] + v * step; });


  // D3 axis object for the temperature scale
  var axis = d3.svg.axis()
    .scale(scale)
    .innerTickSize(7)
    .outerTickSize(0)
    .tickValues(tickValues)
    .orient("left");

  // Add the axis to the image
  var svgAxis = svg.append("g")
    .attr("id", "tempScale")
    .attr("transform", "translate(" + (width/2 - tubeWidth/2) + ",0)")
    .call(axis);

  // Format text labels
  svgAxis.selectAll(".tick text");

  // Set main axis line to no stroke or fill
  svgAxis.select("path")
    .style("stroke", "none")
    .style("fill", "none");

}



