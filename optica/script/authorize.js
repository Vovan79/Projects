//Authorizing of the users
$("#login").val(" ");
$("#password").val("sometext");

var classOfUser = "";

var windowWidth = $(window).width();
var windowHeight = $(window).height();
var authBlockWidth = $("#authdiv").width();
var authBlockHeight = $("#authdiv").height();

var leftPos = (windowWidth - authBlockWidth) / 2 + "px";
var topPos = (windowHeight - authBlockHeight) / 2 + "px";

$("#authdiv").css({left:leftPos, top:topPos});

//=============================================================================================================================================

//Control of the fields of the autorization panel
$("#login").focus(function() {
	$("#login").val("");
});
$("#password").focus(function() {
	$("#password").val("");
});
$("#submit").on("click", function() {				//Clicking the Submit button 
	var login = $("#login").val();
	var password = $("#password").val();
	validateEntry(login, password);
});
$("#authdiv").keydown(function(e) {					//Pressing the Enter button
	if(e.keyCode == 13) {
		var login = $("#login").val();
		var password = $("#password").val();
		validateEntry(login, password);
	}
});
$(window).on("orientationchange", function() {	//Changing the orientation on the mobile
	var windowWidth = $(window).width();
	var authBlockWidth = $("#authdiv").width();

	var leftPos = (windowWidth - authBlockWidth) / 2 + "px";
	$("#authdiv").css({left:leftPos});
});

//============================================================================================================================================

//Resizing of the window on the desktop
$(window).resize(function() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	var leftPos = (windowWidth - authBlockWidth) / 2 + "px";
	var topPos = (windowHeight - authBlockHeight) / 2 + "px";

	$("#authdiv").css({left:leftPos, top:topPos});
});

//============================================================================================================================================

//Validation of the user's entry by JavaScript in the browser
function validateEntry(login, password) {
	var login = login;
	var password = password;
	var fail = "";

	if(login == "")
		fail += "Name is empty.\n";
	else if(login.length < 4)
		fail += "Login must be 4 or more symbols.\n";
	else if(password == "")
		fail += "Password is empty.\n";
	else if(password.length < 4)
		fail += "Password must be 4 or more symbols.\n"; 

	if(fail != "")
		alert(fail);
	else
		phpValidate(login, password); 
}

//Validation of the user's entry by PHP on the server
function phpValidate(login, password) {
	$.post(														//post-request to the server
		"script/phpValidate.php",
		{
			login: login,
			password: password
		}, 
		function(data) {										//callback-function from the server
			if(data == "user" || data == "optic") {
				$("#authdiv").hide();
				$("#searchdiv").css({visibility:"visible"});
				$("#mapdiv").show().css({width: "100%"});
				classOfUser = data;
				//alert("Session: " + data);
				loadApiAndData();
			}
			else if(data == "admin") {
				$("#authdiv").hide();
				$("#searchdiv").css({visibility:"visible"});
				$("#mapdiv").show().css({width: "80%"});
				$("#infodiv").show().css({width: "19%"});
				$('body').css({"background-color": "white"});
				classOfUser = data;
				//alert("Session: " + data);
				loadApiAndData();
			}
			else {
				$("#login").val("");;
				$("#login").focus();
				$("#password").val("");
			}
		}
	);
}

//Loading Google API's and main_script.js 
function loadApiAndData() {
/*	var geometryScript = document.createElement("script");
	geometryScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZDw8y7l94bE_hQ_oW5Jb9BbTooidawKU&libraries=geometry";
	geometryScript.async = false;
	document.body.appendChild(geometryScript);	*/

	var mainScript = document.createElement("script");
	mainScript.src = "script/main_script.js";
	mainScript.async = false;
	document.body.appendChild(mainScript);

	var apiScript = document.createElement("script");
	apiScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZDw8y7l94bE_hQ_oW5Jb9BbTooidawKU&libraries=places,geometry&callback=initMap&language=ru";
	apiScript.async = false;
	document.body.appendChild(apiScript);
}

