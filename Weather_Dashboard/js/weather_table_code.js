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