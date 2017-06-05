/**
 * Header content
 */

var headerString = "<header>\n" +
		"<section>\n" +
		"<nav>\n" +
		"<a href=\"index.html\"><b>Home</b></a>\t" +
		"<a href=\"https://datascience.smu.edu\" onclick=\"redirectAlert()\"><b>About SMU MSDS</b></a>\t" +
		"<a href=\"contactus.html\"><b>Contact Us</b></a>\n" +
		"</nav>\n" +
		"</section>\n" +
		"</header>";

function createHeader(){
	document.write(headerString);
}

function redirectAlert(){
	alert("Leaving SMU SMDS Students Personal pages. You will be redirected to SMU MSDS website.")
}