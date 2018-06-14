'use strict'

$(document).ready(function() {
	$(".welcome input").focus();
	$(".welcome button").click(function() {
		var userName = $(".welcome input").val();
		
		if(userName == 0) {
			$(this).next().text("*enter your name, please");
			$(".welcome input").focus();					
		}
		else {
			$(".welcome").remove();
			$(".userEntry h1").text("Welcome to the Math World, " + userName + "!");
			$(".userEntry").show();
		}
	})
})