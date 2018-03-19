(function($, undefined) {
	$(document).ready(function() {
		//Database of russian words
		var arrayEng = {1:"apple", 2:"age", 3:"animal", 4:"ask", 5:"answer", 6:"ball", 7:"boy", 
						8:"bag", 9:"begin", 10:"cat", 11:"count", 12:"day", 13:"do", 14:"door", 
						15:"point", 16:"how", 17:"what", 18:"trace", 19:"draw", 20:"your", 21:"name", 
						22:"look", 23:"listen", 24:"repeat", 25:"again", 26:"sing", 27:"order", 
						28:"can", 29:"too", 30:"match", 31:"chant", 32:"then", 33:"say", 34:"old", 
						35:"this", 36:"circle", 37:"song", 38:"sound", 39:"letter", 40:"join", 
						41:"bag", 42:"see", 43:"folder", 44:"man", 45:"woman", 46:"teach", 47:"pupil", 
						48:"come", 49:"find", 50:"open", 51:"close", 52:"picture", 53:"word", 
						54:"school", 55:"thing", 56:"right", 57:"time", 58:"skill", 59:"part", 60:"body", 
						61:"let", 62:"learn", 63:"speak", 64:"snake"};
		//Database of english words
		var arrayRus = {1:"яблоко", 2:"возраст", 3:"животное", 4:"спрашивать", 5:"отвечать", 6:"мяч", 7:"мальчик",
						8:"сумка", 9:"начинать", 10:"кошка", 11:"считать", 12:"день", 13:"делать", 14:"дверь", 
						15:"указывать", 16:"как", 17:"что/какой", 18:"обводить", 19:"рисовать", 20:"твой", 21:"имя", 
						22:"смотреть", 23:"слушать", 24:"повторять", 25:"опять", 26:"петь", 27:"упорядочить", 
						28:"мочь/могу", 29:"тоже", 30:"соответствовать", 31:"нараспев", 32:"затем", 33:"сказать", 34:"старый",
						35:"это/этот", 36:"окружность", 37:"песня", 38:"звук", 39:"буква", 40:"соединять", 
						41:"рюкзак", 42:"видеть", 43:"папка", 44:"мужчина", 45:"женщина", 46:"учить", 47:"ученик", 
						48:"подходить", 49:"находить", 50:"открывать", 51:"закрывать", 52:"картина", 53:"слово", 
						54:"школа", 55:"вещь", 56:"правильный", 57:"время", 58:"опыт", 59:"часть", 60:"тело", 
						61:"позволять", 62:"изучать", 63:"говорить", 64:"змея"};

		var numberOfWords = 64;			//the number of words in the dictionary
		var tasksNumber = 5;			//the number of tasks on the page;
		var numberOfMistakes = 0;		//the number of mistakes
				
		var numOfBackground = 1;
		var buttonStart;

		var widthWindow = document.documentElement.clientWidth;			//the width of the window
		var heightWindow = document.documentElement.clientHeight; 		//the height of the window
		
		//Defininf of the size of the window
		if(widthWindow < 900)
			widthWindow = 900;
		if(heightWindow < 600) 
			heightWindow = 600;

		$("body").css({"background-image": "url('img/img1.jpg')"});
		$("#main").css({"user-select": "none", "height": heightWindow, "background": "rgba(255, 255, 255, 0.3)"});
		$("#main").dblclick(function() {return false;});

		if((widthWindow/heightWindow) >= (16/9))
			$("body").css({"background-size": widthWindow + "px auto"});
		else
			$("body").css({"background-size": "auto " + heightWindow + "px"});
		
		//Changing the background of the page every 10 seconds
		setInterval(function() {
			if(numOfBackground == 19)
				numOfBackground = 0;
			$("body").css({"transition-duration": "4s"});
			$("body").css({"background-image": "url(img/img"+(++numOfBackground)+".jpg)"});
		}, 10000);

		//Creating the start button on the page
		createButtonStart();

		function createButtonStart() {
			buttonStart = document.createElement("div");
			$("#main").append(buttonStart);
			$(buttonStart).css({"position": "absolute", "left": (widthWindow/2 - 150), "top": (heightWindow/2 - 50), "width": "300px", "height": "100px",
								 "background-color": "pink", "border-radius": "30px", "text-align": "center", "padding-top": "25px", "font-size": "60px", "color": "green"});
			$(buttonStart).text("Start!!!");
		}

		$(buttonStart).click(function() {
			startLesson();
			$(buttonStart).hide();
		})

		function startLesson() {
			var numberOfTasks = tasksNumber;
			$(".container").css({"marginTop": ((heightWindow - 450) / 4)});		//the position of the blocks on the page
			$(".info").css({"marginTop": ((heightWindow - 450) / 4)});			//the position of the info message on the page

			//Creating the blocks for russian and english words
			for(let i = 0; i < numberOfTasks; i++) {
				var blockRus = document.createElement("div");
				$("#russian").append(blockRus);
				$(blockRus).attr("id", ("blockRus"+i));
				$(blockRus).css({width:"150px", height:"150px", "background-color":"#D0FBE6", "text-align":"center", "border-radius":"35px"});
				var pRus = document.createElement("p");
				$(blockRus).append(pRus);
				$(pRus).attr("id", ("pRus"+i));
				$(pRus).css({display:"inline-block", height:"30px", "margin-top":"55px", "text-align":"center", "line-height":"35px"});
				$(pRus).text("");
			
				var blockEng = document.createElement("div");
				$("#english").append(blockEng);
				$(blockEng).attr("id", ("blockEng"+i));
				$(blockEng).css({width:"150px", height:"150px", "backgroundColor":"#D0FBE6", "text-align":"center", "border-radius":"35px"});
				var pEng = document.createElement("p");
				$(blockEng).append(pEng);
				$(pEng).attr("id", ("pEng"+i));
				$(pEng).css({display:"inline-block", height:"30px", "margin-top":"55px", "text-align":"center", "line-height":"35px"});
				$(pEng).text("");
			}

			//The style and the reaction of the russian blocks by dropping the english block
			$("#russian div").droppable({
										over: function() {
											$(this).css({"backgroundColor": "pink", opacity: 0.8});
										},
										out: function() {
											$(this).css({"backgroundColor": "#D0FBE6", opacity: 1});
										},
										drop: function(event, ui) {
											if($(this).attr("keyNumber") == ui.draggable.attr("keyNumber")) {
												$(this).remove();
												ui.draggable.remove();
												$(".info").text("You are right").css({"visibility": "visible", "color": "blue"});
												if(--numberOfTasks == 0) {			//when the tasks are ended
													$(".container div").remove();
													$(".info").css({"visibility": "hidden"}).text("");
													$(buttonStart).show();
												}
											}
											else {
												numberOfMistakes++;
												$(this).css({"backgroundColor": "#D0FBE6", opacity: 1});	
												$(".info").text("You are wrong").css({"visibility": "visible", "color": "red"});
												return;
											}
										},
										activate: function() {
											$(".info").text("").css({"visibility": "hidden"});
										}										
			});
			
			//The style of the english blocks by dragging
			$("#english div").draggable({containment: "body", cursor: "move", revert: true,
										start: function() {
											$(this).css({"backgroundColor": "yellow", opacity: 0.8});
										},
										stop: function() {
											$(this).css({"backgroundColor": "#D0FBE6", opacity: 1});
										}
			});

			let keyOfWord;
			let randomNum;
			let arrayOfKeys = [];
			let arrayOfNums = [];
			let counterOfKeys = 0;
			let counterOfNums = 0;

			while(counterOfNums < numberOfTasks)
			{
				randomNum = Math.floor(Math.random() * numberOfTasks);		//creating a random number from 0 to numberOfTasks
				if(valueOff(randomNum, arrayOfNums)) {						//validating a random number in the numsArray
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

			//Filling the words from the dicitionary to the blocks
			for(let i = 0; i < numberOfTasks; i++) {
				var fontSize = 30;
				$("#blockRus" + i).attr("keyNumber", arrayOfKeys[i]);
				$("#pRus"+i).text(arrayRus[arrayOfKeys[i]]);
				$("#pRus"+i).css({"font-size": (fontSizeDetermine($("#pRus"+i), $("#blockRus"+i).css("width"), fontSize) + "px")});
				
				$("#blockEng" + arrayOfNums[i]).attr("keyNumber", arrayOfKeys[i]);
				$("#pEng"+arrayOfNums[i]).text(arrayEng[arrayOfKeys[i]]);
				$("#pEng"+arrayOfNums[i]).css({"font-size": (fontSizeDetermine($("#pEng"+i), $("#blockEng"+i).css("width"), fontSize) + "px")});
			}

			//Determine the font-size of the words inside of the blocks 
			function fontSizeDetermine($pBlock, divWidth, fontSize) {
				$pBlock.css({"font-size":fontSize});
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
				for(let i = 0; i < arrayOfValues.length; i++) {
					if(arrayOfValues[i] == value)
						return false;
				}
				return true;
			}
		}

		//Changing sizes of the application by resizing
		$(window).resize(function() {
			$("body").css({"transition-duration": "0s"});
			var widthWindow = document.documentElement.clientWidth;
			var heightWindow = document.documentElement.clientHeight;

			if(widthWindow < 900)
				widthWindow = 900;
			if(heightWindow < 600) 
				heightWindow = 600;

			if((widthWindow/heightWindow) >= (16/9))
				$("body").css({"background-size": widthWindow + "px auto"});
			else
				$("body").css({"background-size": "auto " + heightWindow + "px"});

			$("#main").css({"width": widthWindow, "height": heightWindow});

			if(heightWindow <= 500) 
				$(".container, .info").css({"marginTop": 10});
			else
				$(".container, .info").css({"marginTop": ((heightWindow - 450) / 4)});
		});
	});
})(jQuery);