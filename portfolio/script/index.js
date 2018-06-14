(function($, undefined) {
	$(document).ready(function() {
		//Localize the footer on the page
		localizeFooter();
		
		function localizeFooter() {
			var wh = $(window).height();		//define the height of the window
			//alert("wh: " + wh);
			var hh = $("header").height();		//define the height of the header block
			//alert("hh: " + hh);
			var mh = $("main").height();		//define the height of the main block
			//alert("mh: " + mh);
			var fh = $("footer").height();		//define the height of the footer block
			//alert("fh: " + fh);
			
			if(mh <= wh)
				$("main").css({"min-height":(wh - hh - fh) + "px"}); 
		}

		//Localize the footer on the page when the size of the page is resized
		$(window).resize(function() {
			localizeFooter();
		});

		//Localize the footer on the page when the orientation of the page is changed
		$(window).on("orientationchange", function() {
			this.location.reload();
		});


		//===========================================================================================================================================

		//change the language of the page information
		var lang = "russian";

		$("#pageLang").click(function() {
			$(".lang").hide();
			if(lang == "russian")
			{
				this.innerHTML = "RUS";
				$(this).css({"background-color": "#8DA2FC", "color": "red", 
					"cursor": "pointer", "border-color": "#8DA2FC"});
				lang = "english";
				$(".english").css({"display": "inline-block"}).show();
			}
			else
			{	
				this.innerHTML = "ENG";
				$(this).css({"background-color": "white", "color": "red", 
					"cursor": "pointer", "border-color": "white"});
				lang = "russian";
				$(".russian").show();
			}
		});

		$("#pageLang").mouseover(function() {
			if(this.innerHTML == "ENG") 
				$(this).css({"background-color": "white", "color": "red", 
					"cursor": "pointer", "border-color": "white"});
			if(this.innerHTML == "RUS")
				$(this).css({"background-color": "#8DA2FC", "color": "red", 
					"cursor": "pointer", "border-color": "#8DA2FC"});	
		});

		$("#pageLang").mouseout(function() {
			$(this).css({"background-color": "", "color": "", "cursor": "", "border-color": ""});
		});

		//=============================================================================================================================================

		//fading the toTop button by scrolling the page
		$(window).scroll(function() {				//fading of the toTop button
			var topOffset = $(this).scrollTop();
			if(topOffset > 100) 
				$("#toTop").fadeIn();
			else
				$("#toTop").fadeOut();
		});

		$("#toTop").click(function() {				//scrolling to the top of the page
			$("body,html").animate({scrollTop: 0}, 800);
			return false;
		});

		$("#toTop").mouseover(function() {			//cursor over the toTop button
			$(this).css({"cursor": "pointer"});
		});

		//=============================================================================================================================================

		//Rotating of the information pages by the click of the menu panel
		var divRotated = false;
		var activeSection = "";
		var canClickMenu = true;

		$("header nav div").click(function() {
			localizeFooter();

			if(canClickMenu == false) {return;}
			
			if(activeSection == "" && $(this).attr("class") == "start") {
				return;
			}

			if(activeSection == $(this).attr("class")) {
				return;
			}

			canClickMenu = false;

			$("header nav div span").css({color:"", "font-weight":"normal", transform:""});
			$(this).find("span").css({color:"red", "font-weight":"bold", transform:"scale(1.2)"});
			activeSection = $(this).attr("class");
			
			if(divRotated == true) {
				$("#info").css({transform:"rotateY(0deg)"});
				divRotated = false;
				setTimeout(function() {
					$("main div section").css({transform:"rotateY(0deg)", display:"none"});
					$("#" + activeSection).css({display:"block"});
				}, 1000);
			}
			else {
				$("#info").css({transform:"rotateY(180deg)"});
				divRotated = true;
				setTimeout(function() {
					$("main div section").css({transform:"rotateY(180deg)", display:"none"});
					$("#" + activeSection).css({display:"block"});
				}, 1000);	
			}	

			setTimeout(function() {
				canClickMenu = true;
			}, 2000);		
		});

		//===============================================================================================================================================

		//showing slides of the portfolio
        $(".slides").hide();

        $("#portfolio div span").click(function() {
        	var selfId = $(this).parent().attr("id");
            $("#" + selfId + " > .slides").slideToggle(1500);
        });

        $(".slides img").mouseover(function() {
        	$(".slides img").css({transform:""});
        	$(this).css({transform:"scale(2)"});
        });

        $(".slides img").mouseout(function() {
        	$(".slides img").css({transform:""});
        });

        //opening pdf-files of the portfolio by clicking the slide
        $("#systemsDev .slides img").click(function() {
        	var newSrc = $(this).attr("src");
        	newSrc = newSrc.substr(0, 10) + ".pdf";
        	window.open(newSrc);
        });
    }); 
})(jQuery);

