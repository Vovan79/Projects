'use strict';

$(document).ready(function(){
	
	//code for the slider of the header section

	var sliderArr = ["url(img/slide1a.jpg)", "url(img/slide2a.jpg)", "url(img/slide3a.jpg)", "url(img/slide4a.jpg)"];
	var sliderNum = 0;
	$(".slider").css("background-image", sliderArr[sliderNum]);
	
	setInterval(showSlide, 7000);
	function showSlide(){
		$(".slider").css("background-image", sliderArr[++sliderNum]);
		if(sliderNum == sliderArr.length-1)
			sliderNum = -1;				
	}
	
//******************************************************************************************************************

	//code for the canvas images to show the clients activities

	(function($){
  			$.fn.showPercent = function(percent){
  				var percent_val = percent;
  				var canvas = $("<canvas>").appendTo($(this));
  				var ctx = canvas[0].getContext("2d");
  				$(canvas).attr({width: "100", height: "100"});
  				
  				var percent_val = percent;
					ctx.strokeStyle = "#fff";
					ctx.fillStyle = "#fff";
					ctx.lineWidth = 3;
					ctx.font = "bold 30px sans-serif";
					ctx.beginPath();
					ctx.arc(50, 50, 45, 1.5*Math.PI, (1.5*Math.PI + (percent_val/100)*2*Math.PI));
					ctx.fillText((percent_val + "%"), 25, 60);
					ctx.stroke();
			};
		})(jQuery); 

		$("#percent1").showPercent(73);
		$("#percent2").showPercent(45);

//******************************************************************************************************************		

	//code for the opening the map of Kharkov

	$("#Kharkov").click(function(){
		//document.location.href = "https://yandex.ua/maps/147/kharkiv/?lang=ru&ncrnd=31&ll=36.236709%2C50.009399&z=16";
		open($(".contacts_icon a").attr("href"));
	})

//******************************************************************************************************************

	//code for the slider of the clients comments

	$("#arrow_left").mouseover(function() {
		$(this).attr("src", "img/arrow_left_hover.jpg")
	})
	$("#arrow_left").mouseout(function() {
		$(this).attr("src", "img/arrow_left.jpg")
	})
	$("#arrow_right").mouseover(function() {
		$(this).attr("src", "img/arrow_right_hover.jpg")
	})
	$("#arrow_right").mouseout(function() {
		$(this).attr("src", "img/arrow_right.jpg")
	})

	//var sliderArr = ["img/person4.jpg", "img/person1.jpg", "img/person2.jpg", "img/person3.jpg"];
	var step = 450;
	var between_img = 20;
	var imgNum = 4;
	var ready_right = true;
	var ready_left = true;
	
	for(var i=1; i<=imgNum; i++) {
		$("#img"+i).css("left", step*(i-2)+between_img*(i-2));
	}

	$("#arrow_right").click(moveRight);
	$("#arrow_left").click(moveLeft);

	function moveRight() {
		if(ready_right == true) {
			ready_right = false; ready_left = false;
			for(var i=1; i<=imgNum; i++) {
			
				if(parseInt($("#img"+i).css("left")) == (step+between_img)*3)  
					$("#img"+i).css("left", (-step-between_img));
			
				$("#img"+i).animate({left: (parseInt($("#img" + i).css("left")) + (step+between_img))},2000);
			}
			setTimeout(function() { ready_right = true; ready_left = true }, 2200);
		}
		else return;
	}

	function moveLeft() {
		if(ready_left == true) {
			ready_left = false; ready_right = false;
			for(var i=1; i<=imgNum; i++) {
			
				if(parseInt($("#img" + i).css("left")) == -(step+between_img)*2) 
					$("#img"+i).css("left", step*2+between_img*2);
			
				$("#img"+i).animate({left: (parseInt($("#img" + i).css("left")) - (step+between_img))},2000);
			}
			setTimeout(function() { ready_left = true; ready_right = true }, 2200);
		}
		else return;		
	}

//******************************************************************************************************************

	//code for the opening/closing the reserving form

	$(".popup_reserving").click(function() {
		showPopup();
	})

	$("#close_icon").click(function(){
		hidePopup();
	})

	function hidePopup() {
		$("#popup").hide();
	}
	function showPopup() {
		$("#popup").show();	
	}

//******************************************************************************************************************

	//code for the enlarging of the guide/foto pictures

	$("#guide").mouseover(function() {
		$(this).css({width: 200, height: 200});
	})
	$("#guide").mouseout(function() {
		$(this).css({width: 158, height: 158});
	})
	$("#photo").mouseover(function() {
		$(this).css({width: 200, height: 200});
	})
	$("#photo").mouseout(function() {
		$(this).css({width: 158, height: 158});
	})

	//******************************************************************************************************************

	//code for the checking of the reserving form entry
})


