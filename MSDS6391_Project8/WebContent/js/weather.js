/**
 * 
 */

var apiid = '0b55e5f12b5583816c9356d808f18249'
var city = '';
function gettingJSON(){
	document.write("jquery loaded");
	$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=London&appid=' + apiid,function(json){
	city = json.name;
	$(document.body).append('City: ' + city);
})
}