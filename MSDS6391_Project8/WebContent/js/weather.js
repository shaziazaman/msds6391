/**
 * 
 */

var apiid = '0b55e5f12b5583816c9356d808f18249'
function gettingJSON(){
	document.write("jquery loaded");
	var jsondata = $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&appid=0b55e5f12b5583816c9356d808f18249",function(json){
	$(document.body).append(jsondata.responseText);
})
}