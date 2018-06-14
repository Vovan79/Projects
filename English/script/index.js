//========================THE PREPARATION PART===================================================================================================================

var useragent = navigator.userAgent;
var tasksNumber = 5;						//the number of tasks on the page;
var numberOfMistakes = 0;					//the number of mistakes
					
var numOfBackground = 1;
var buttonStart;

var widthWindow = $(window).width();		//the width of the window
var heightWindow = $(window).height(); 		//the height of the window

//========================SIZE AND BACKGROUND OF THE WINDOW======================================================================================================
				
if(useragent.indexOf("iPhone") != -1 || useragent.indexOf("Android") != -1) {
	$("#main").css({backgroundColor:"white", paddingTop:"10%", width:widthWindow, height:heightWindow});	
}
else { 
	//Defining the size of the window
	if(widthWindow < 900)
		widthWindow = 900;
	if(heightWindow < 600) 
		heightWindow = 600;

	$("body").css({backgroundImage:"url('img/img1.jpg')"});
	$("#main").css({userSelect:"none", height:heightWindow, background:"rgba(255, 255, 255, 0.3)"});
	$("#main").dblclick(function() {return false;});

	if((widthWindow/heightWindow) >= (16/9))
		$("body").css({backgroundSize: widthWindow + "px auto"});
	else
		$("body").css({backgroundSize: "auto " + heightWindow + "px"});
				
	//Changing the background image of the page every 10 seconds
	setInterval(function() {
		if(numOfBackground == 19)
			numOfBackground = 0;
		$("body").css({transitionDuration:"4s"});
		$("body").css({backgroundImage:"url(img/img"+(++numOfBackground)+".jpg)"});
	}, 10000);		
}

//========================START OF THE APPLICATION===============================================================================================================

//Creating the start button on the page
createButtonStart();

function createButtonStart() {
	buttonStart = document.createElement("div");
	$("#main").append(buttonStart);

	if(useragent.indexOf("iPhone") != -1 || useragent.indexOf("Android") != -1) {
		$(buttonStart).css({position:"absolute", left:"30%", top:"39%", width:"40%", height:"10%", backgroundColor:"blue", 
							borderRadius:"0.5em", textAlign:"center", lineHeight:"1.5em", fontSize:"2em", color:"white"});

		//Defining touch events for mobile devices versus mouse events for desktop
		document.addEventListener("touchstart", touchHandler, true);		
		document.addEventListener("touchmove", touchHandler, true);
		document.addEventListener("touchend", touchHandler, true);
		document.addEventListener("touchcancel", touchHandler, true);		
	}
	else {
		$(buttonStart).css({position:"absolute", left:(widthWindow/2 - 150), top:(heightWindow/2 - 50), width:"300px", height:"100px",
							backgroundColor:"pink", borderRadius:"30px", textAlign:"center", paddingTop:"25px", fontSize:"60px", color:"green"});
	}
	$(buttonStart).text("Start!!!");
}

$(buttonStart).mouseover(function() {
	$(this).css({cursor:"pointer"});
});
$(buttonStart).mousedown(function() {
	$(this).hide();
	startLesson();
});

//========================START LEARNING ENGLISH=================================================================================================================

//Start the learning process
function startLesson() {
	var dictionary = EngRus;
	var numberOfWords = dictionary.length;	//the number of words in the dictionary
	var numberOfTasks = tasksNumber;		//a number of the lesson's task
	var widthWindow = $(window).width();	//the width of the window
	var heightWindow = $(window).height();	//the height of the window

	var keyOfWord;							//the key of the word from the dictionary
	var randomNum;							//a random number from 0 to (numberOfTasks-1) (0 - 4)
	var arrayOfKeys = [];					//an array of the unique keyOfWord 
	var arrayOfNums = [];					//an array of the unique numbers from 0 to (numberOfTasks-1) (0 - 4)
	var counterOfKeys = 0;					//a counter of the keyOfWord in the arrayOfKeys
	var counterOfNums = 0;					//a counter of the unique numbers in the arrayOfNums

	//Creating the blocks for russian and english words
	for(var i = 0; i < numberOfTasks; i++) {
		var blockRus = document.createElement("div");
		$("#russian").append(blockRus);
		$(blockRus).attr("id", ("blockRus"+i));
		var pRus = document.createElement("p");
		$(blockRus).append(pRus);
		$(pRus).attr("id", ("pRus"+i));
		$(pRus).text("");
					
		var blockEng = document.createElement("div");
		$("#english").append(blockEng);
		$(blockEng).attr("id", ("blockEng"+i));
		var pEng = document.createElement("p");
		$(blockEng).append(pEng);
		$(pEng).attr("id", ("pEng"+i));
		$(pEng).text("");

		if(useragent.indexOf("iPhone") != -1 || useragent.indexOf("Android") != -1) {
			$(blockRus).css({width:"18%", height:"50%", backgroundColor:"#D0FBE6", textAlign:"center", borderRadius:"1em", border:"1px solid"});
			$(blockEng).css({width:"18%", height:"50%", backgroundColor:"#D0FBE6", textAlign:"center", borderRadius:"1em", border:"1px solid"});
			$(pRus).css({display:"inline-block", height:"30%", marginTop:"35%", textAlign:"center", lineHeight:"120%"});
			$(pEng).css({display:"inline-block", height:"100%", textAlign:"center", lineHeight:"200%"});					
		}
		else {
			$(".container, .info").css({marginTop: ((heightWindow - 450) / 4)});		//the position of the blocks and the info message on the page
			$(blockRus).css({width:"150px", height:"150px", backgroundColor:"#D0FBE6", textAlign:"center", borderRadius:"35px"});
			$(blockEng).css({width:"150px", height:"150px", backgroundColor:"#D0FBE6", textAlign:"center", borderRadius:"35px"});
			$(pRus).css({display:"inline-block", height:"30px", marginTop:"55px", textAlign:"center", lineHeight:"35px"});
			$(pEng).css({display:"inline-block", height:"30px", marginTop:"55px", textAlign:"center", lineHeight:"35px"});
		}
	}

	while(counterOfNums < numberOfTasks)
	{
		randomNum = Math.floor(Math.random() * numberOfTasks);		//creating a random number from 0 to (numberOfTasks - 1)
		if(valueOff(randomNum, arrayOfNums)) {						//validating a random number (0 - 4) in the arrayOfNums
			arrayOfNums.push(randomNum);
			counterOfNums++;
		}
	}

	while(counterOfKeys < numberOfTasks)
	{
		keyOfWord = Math.ceil(Math.random() * numberOfWords);		//creating a random key from 1 to numberOfWords
		if(valueOff(keyOfWord, arrayOfKeys)) {						//validating a key of the word in the keysArray
			arrayOfKeys.push(keyOfWord);
			counterOfKeys++;
		}
	}	

	//Filling the words from the dictionary by the keyOfWord to the blocks
	for(var j = 0; j < numberOfTasks; j++) {
		var pair = dictionary[arrayOfKeys[j]];						//a pair of english-russian words in the dictionary
		$("#blockEng" + arrayOfNums[j]).attr("keyNumber", arrayOfKeys[j]);
		$("#pEng"+arrayOfNums[j]).text(pair[0]);
		$("#blockRus" + j).attr("keyNumber", arrayOfKeys[j]);
		$("#pRus"+j).text(pair[1]);

		if(useragent.indexOf("iPhone") != -1 || useragent.indexOf("Android") != -1) {
			var fontSize = 15;
			var finalFontSizeRus = fontSizeDetermine($("#pRus"+j), $("#blockRus"+j).css("width"), fontSize);
			var finalFontSizeEng = fontSizeDetermine($("#pEng"+arrayOfNums[j]), $("#blockEng"+arrayOfNums[j]).css("width"), fontSize);
			$("#pRus"+j).css({fontSize:(finalFontSizeRus + "px"), paddingTop:((fontSize - finalFontSizeRus + 2)/2 + "px")});
			$("#pEng"+arrayOfNums[j]).css({fontSize:(finalFontSizeEng + "px"), paddingTop:((fontSize - finalFontSizeEng + 2)/2 + "px")});										
		}
		else {
			var fontSize = 30;
			$("#pRus"+j).css({fontSize: (fontSizeDetermine($("#pRus"+j), $("#blockRus"+j).css("width"), fontSize) + "px")});
			$("#pEng"+arrayOfNums[j]).css({fontSize: (fontSizeDetermine($("#pEng"+arrayOfNums[j]), $("#blockEng"+arrayOfNums[j]).css("width"), fontSize) + "px")});					
		}
	}	

	//The style and the reaction of the russian blocks by dropping the english block
	$("#russian div").droppable({
								over: function() {
									$(this).css({backgroundColor:"pink", opacity:0.8});
								},
								out: function() {
									$(this).css({backgroundColor:"#D0FBE6", opacity:1});
								},
								drop: function(event, ui) {
									if($(this).attr("keyNumber") == ui.draggable.attr("keyNumber")) {
										$(this).remove();
										ui.draggable.remove();
										$(".info").text("You are right").css({visibility:"visible", color:"blue"});
										if(--numberOfTasks == 0) {			//when the tasks are ended
											$(".container div").remove();
											$(".info").css({visibility:"hidden"}).text("");
											$(buttonStart).show();
										}
										return;
									}
									else {
										numberOfMistakes++;
										$(this).css({backgroundColor:"#D0FBE6", opacity:1});	
										$(".info").text("You are wrong").css({visibility:"visible", color:"red"});
										return;
									}
								},
								activate: function() {
									$(".info").text("").css({visibility:"hidden"});
								}										
	});
					
	//The style of the english blocks by dragging
	$("#english div").draggable({containment:"body", cursor:"move", revert:true,
								start: function() {
									$(this).css({backgroundColor:"yellow", opacity:0.8});
								},
								stop: function() {
									$(this).css({backgroundColor:"#D0FBE6", opacity:1});
								}
	});

	//Determine and correct the font-size of the words inside of the blocks 
	function fontSizeDetermine($pBlock, divWidth, fontSize) {
		$pBlock.css({fontSize:fontSize});
		var divWidth = parseInt(divWidth);
		var pWidth = parseInt($pBlock.css("width"));
		if(pWidth >= (divWidth - 2)) {
			fontSize = Math.floor(fontSize * 0.95);
			return fontSizeDetermine($pBlock, divWidth, fontSize);
		}
		else {
			return fontSize;
		}
	}	

	//Valitating the presence of the value in the valuesArray
	function valueOff(value, arrayOfValues) {
		for(var k = 0; k < arrayOfValues.length; k++) {
			if(arrayOfValues[k] == value)
				return false;
		}
		return true;
	}		
}	

//=======================================================================================================================================================

//Changing sizes of the application by resizing of the window
$(window).resize(function() {
	if(useragent.indexOf("iPhone") != -1 || useragent.indexOf("Android") != -1) {
		return false;
	}

	$("body").css({transitionDuration:"0s"});
	var widthWindow = $(window).width();				//the width of the window
	var heightWindow = $(window).height();				//the height of the window

	if(widthWindow < 900)
		widthWindow = 900;
	if(heightWindow < 600) 
		heightWindow = 600;

	if((widthWindow/heightWindow) >= (16/9))
		$("body").css({backgroundSize: widthWindow + "px auto"});
	else
		$("body").css({backgroundSize: "auto " + heightWindow + "px"});

	$("#main").css({"width":widthWindow, "height":heightWindow});

	if(heightWindow <= 500) 
		$(".container, .info").css({marginTop:10});
	else
		$(".container, .info").css({marginTop: ((heightWindow - 450) / 4)});

	$(buttonStart).css({left:(widthWindow/2 - 150), top:(heightWindow/2 - 50)});
});		

//=======================================================================================================================================================

//The function-handler of the touch events for mobile devices		
function touchHandler(event) {
	var touches = event.changedTouches;
	var first = touches[0];
	var type = "";

	switch(event.type) {
		case "touchstart": type = "mousedown"; break;
		case "touchmove": type = "mousemove"; break;
		case "touchend": type = "mouseup"; break;
		default: return;
	}

	var simulatedEvent = document.createEvent("MouseEvent");
	simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY,
									false, false, false, false, 0, null);
	first.target.dispatchEvent(simulatedEvent);
	event.preventDefault();
}