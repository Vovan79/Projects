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
		
		$("#startMenu").click(function() {
			window.scrollTo(0, -161);						//161 - the height of the fixed header block
		});
		$("#aboutUsMenu").click(function() {
			var targetDivTop = $("div.map").offset().top;
			window.scrollTo(0, (+targetDivTop - 161));
		});
		$("#programMenu").click(function() {
			var targetDivTop = $("main").offset().top;
			window.scrollTo(0, (+targetDivTop - 161));
		});		
		$("#recallsMenu").click(function() {
			var targetDivTop = $("#recall").offset().top;
			window.scrollTo(0, (+targetDivTop - 161));
		});
		$("#contactsMenu").click(function() {
			var targetDivTop = $("#contacts").offset().top;
			window.scrollTo(0, (+targetDivTop - 161));
		});

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

	//validation of the reserving form
	
	var resSecName = $("#reservingSection").find("input").eq(0);
	var resSecEmail = $("#reservingSection").find(":input").eq(1);
	var resSecTel = $("#reservingSection").find(":input").eq(2);

	resSecName.focus(function() {$(this).val("").css({color: "black", fontSize: "14px"})});
	resSecEmail.focus(function() {$(this).val("").css({color: "black", fontSize: "14px"})});
	resSecTel.focus(function() {$(this).val("").css({color: "black", fontSize: "14px"})});

	var popupName = $("#popup").find("input").eq(0);
	var popupEmail = $("#popup").find(":input").eq(1);
	var popupTel = $("#popup").find(":input").eq(2);

	popupName.focus(function() {$(this).val("").css({color: "black", fontSize: "14px"})});
	popupEmail.focus(function() {$(this).val("").css({color: "black", fontSize: "14px"})});
	popupTel.focus(function() {$(this).val("").css({color: "black", fontSize: "14px"})});

	$("#resSecBtn").click(function() {
		if(validate(resSecName, resSecEmail, resSecTel)) {
			var name = resSecName.val();
			var email = resSecEmail.val();
			var tel = resSecTel.val();
			alert("The form is validated! " + " name: " + name + " email: " + email + " tel: " + tel);
			clearForm(resSecName, resSecEmail, resSecTel);
		}
	});

	$("#popupBtn").click(function() {
		if(validate(popupName, popupEmail, popupTel)) {
			var name = popupName.val();
			var email = popupEmail.val();
			var tel = popupTel.val();
			alert("The form is validated! " + " name: " + name + " email: " + email + " tel: " + tel);
			clearForm(popupName, popupEmail, popupTel);
		}
	});

	function validate(name, email, tel) {
		var regExp_name = /^[a-zA-z ]+$/;
		var regExp_email = /^([a-zA-z0-9_.-])+@([a-zA-z0-9_.-])+\.([a-zA-z]){2,4}$/;
		var regExp_tel = /^(\+38\(\d{3}\)\d{3}\-\d{2}\-\d{2})$/;

		if(name.val() == "" || name.val() == "*Enter your name" || !regExp_name.test(name.val())) {
			name.val("*Enter your name").css({color: "red", fontSize: "20px"});
			return;
		}
		if(email.val() == "" || email.val() == "*Enter your e-mail" || !regExp_email.test(email.val())) {
			email.val("*Enter your e-mail").css({color: "red", fontSize: "20px"});
			return;
		}	
		if(tel.val() == "" || tel.val() == "*Enter your telephone" || !regExp_tel.test(tel.val())) {
			tel.val("*Enter your telephone").css({color: "red", fontSize: "20px"});
			return;
		}
		return true;
	}

	function clearForm(name, email, tel) {
		name.val("");
		email.val("");
		tel.val("");
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


