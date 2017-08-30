$(document).ready(function(){
	
	var sliderArr = ["url(img/slide1.jpg)", "url(img/slide2a.jpg)", "url(img/slide3a.jpg)", "url(img/slide4a.jpg)"];
	var sliderNum = 0;
	$(".slider").css("background-image", sliderArr[sliderNum]);
	
	setInterval(showSlide, 5000);
	function showSlide(){
		$(".slider").css("background-image", sliderArr[++sliderNum]);
		if(sliderNum == sliderArr.length-1)
			sliderNum = -1;				
	}
	
//******************************************************************************************************************
	$("#Kharkov").click(function(){
		//document.location.href = "https://yandex.ua/maps/147/kharkiv/?lang=ru&ncrnd=31&ll=36.236709%2C50.009399&z=16";
		open($(".contacts_icon a").attr("href"));
	})
	
//******************************************************************************************************************
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

		$("#percent1").showPercent(72);
		$("#percent2").showPercent(45);
})
