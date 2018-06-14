'use strict'

$(document).ready(function(){
	$("#nextBtn").click(function() {
		$(".error").text("");

		if($("#operations").children()[0].selected){
			$("#operations").next().text("*choose an operation name");
			$("#operations").focus();
			return;
		}
		if($("#operators").children()[0].selected){
			$("#operators").next().text("*choose an operators number");
			$("#operators").focus();
			return;
		}
		if($("#level").children()[0].selected){
			$("#level").next().text("*choose a level");
			$("#level").focus();
			return;
		}
		if($("#numberOfTasks").children()[0].selected){
			$("#numberOfTasks").next().text("*choose a number of tasks");
			$("#numberOfTasks").focus();
			return;
		}
		
		$(".userEntry").hide();
		$(".math").show();

		var operation = $("#operations").children().filter(":selected").text();
		var operatorsNum = $("#operators").children().filter(":selected").text();
		var level = $("#level").children().filter(":selected").text();
		var numOfTasks = $("#numberOfTasks").children().filter(":selected").text();
		var mistakes = 0;
		var mistakesStr = $("#mistakesStr");
		var task = 0;
		var taskNumStr = $("#taskNumStr");
		var result;
		var percent;
		var message = $("#message");
		var answer = $("#answerStr");
		answer.focus();
		var readyCalc = true;
		var timeStart, timeEnd, timeTasks, timeHours, timeMinutes, timeSeconds;
		var timeString = "";
		timeStart = Date.now();
		
		if(operatorsNum == "2 operators") 
			init2op(operation, level);
		else 
			init3op(operation, level);

		$("#calculate").click(function() {
			message.css({"color":"black"});
			if(isNaN(+answer.val()) || answer.val() == "") {
				message.css({"color":"red"}).text("Enter Number, please");
				answer.focus().val("");
				return;
			}
			if(readyCalc == true) {
				readyCalc = false;
				if(answer.val() == result) {
					message.css({"backgroundColor":"green"}).text("That is right :-)");
					if(task == numOfTasks){
						timeEnd = Date.now();
						timeTasks = timeEnd - timeStart;
						timeHours = Math.floor(timeTasks / 3600000);
						timeMinutes = Math.floor(timeTasks / 60000 - timeHours * 60);
						timeSeconds = Math.floor(timeTasks / 1000 - (timeHours + timeMinutes) * 60);
						if(timeHours < 10)
							timeHours = "0" + timeHours;
						if(timeMinutes < 10)
							timeMinutes = "0" + timeMinutes;
						if(timeSeconds < 10)
							timeSeconds = "0" + timeSeconds;
						timeString = timeHours + ":" + timeMinutes + ":" + timeSeconds;
						percent = ((task - mistakes) / task) * 100;
						createFinishDiv();
						setTimeout(showResult, 2000);
					}
					else						
						setTimeout(newTask, 2000);
				}					
				else
				{	
					message.css({"backgroundColor":"red"}).text("That is wrong :-(");
					mistakesStr.val(++mistakes);
					setTimeout(repeatTask, 2000);
				}	
			}
			else 
				return;
		});

		function init2op(operation, level) {
			var lvl = level.charAt(6);
			var num1, num2, symb;
			taskNumStr.val(++task); 
			mistakesStr.val(mistakes);
		
			if(operation == "Sum") {
				num1 = Math.floor(Math.random()*30*lvl + 1);
				num2 = Math.floor(Math.random()*15*lvl + 1);
				symb = createSignSum();
				if(symb == "+") {
					$("#taskStr").text(num1 + " + " + num2 + " = ");
					result = num1 + num2;					
				}
				else {
					$("#taskStr").text(num1 + " - " + num2 + " = ");
					result = num1 - num2;
				}
			}
			else {
				num1 = Math.floor(Math.random()*10*lvl + 1);
				num2 = Math.floor(Math.random()*10*lvl + 1);
				$("#taskStr").text(num1 + " * " + num2 + " = ");
				result = num1 * num2;
			}
		
			function createSignSum(){
				if(Math.random() < 0.5)
					return "-";
				else
					return "+";
			}
		}
		function init3op(operation, level) {
			var lvl = level.charAt(6);
			var num1, num2, num3, symb1, symb2;
			taskNumStr.val(++task); 
			mistakesStr.val(mistakes);
		
			if(operation == "Sum") {
				num1 = Math.floor(Math.random()*30*lvl + 1);
				num2 = Math.floor(Math.random()*15*lvl + 1);
				num3 = Math.floor(Math.random()*15*lvl + 1);
				symb1 = createSignSum();
				symb2 = createSignSum();
				if(symb1 == "+") {
					if(symb2 == "+") 
						result = num1 + num2 + num3;
					else
						result = num1 + num2 - num3;
				}
				else {
					if(symb2 == "+") 
						result = num1 - num2 + num3;
					else
						result = num1 - num2 - num3;	
				}
				$("#taskStr").text(num1 + " " + symb1 + " " + num2 + " " + symb2 + " " + num3 + " = ");
			}
			else {
				num1 = Math.floor(Math.random()*10*lvl + 1);
				num2 = Math.floor(Math.random()*10*lvl + 1);
				num3 = Math.floor(Math.random()*10*lvl + 1);
				$("#taskStr").text(num1 + " * " + num2 + " * " + num3 + " = ");
				result = num1 * num2 * num3;
			}
		
			function createSignSum(){
				if(Math.random() < 0.5)
					return "-";
				else
					return "+";
			}
		}
		function newTask() {
			readyCalc = true;
			answer.val("").focus();
			message.css({"backgroundColor":""}).text("");
			if(operatorsNum == "2 operators")
				init2op(operation, level);
			else
				init3op(operation, level);
		}
		function repeatTask() {
			readyCalc = true;
			answer.val("").focus();
			message.css({"backgroundColor":""}).text("");
		}
		function createFinishDiv() {
			var finishDiv = document.createElement("div");
			finishDiv.id = "finishDiv";
			document.body.appendChild(finishDiv);
			finishDiv.style.width = document.documentElement.clientWidth/2 + "px";
			finishDiv.style.height = document.documentElement.clientHeight/2 + "px";
			finishDiv.style.position = "fixed";
			finishDiv.style.left = document.documentElement.clientWidth/4 + "px";
			finishDiv.style.top = document.documentElement.clientHeight/4 + "px";
			finishDiv.style.opacity = 0;
			finishDiv.style.zIndex = -1;
		}
		function showResult() {
			$(".theEnd").fadeIn(2000).css("display", "flex");
			//message.css({"backgroundColor":""}).text("");
			$(".math").hide();
			var finishDiv = document.getElementById("finishDiv");
			finishDiv.style.transitionProperty = "opacity";
			finishDiv.style.transitionDuration = "5s";
			finishDiv.style.opacity = 1;
			finishDiv.style.zIndex = 2;

			var canvas = document.createElement("canvas");
			finishDiv.appendChild(canvas);
			canvas.width = document.documentElement.clientWidth/2;
			canvas.height = document.documentElement.clientHeight/2;
			canvas.style.backgroundColor = "#7D9AD7";
			var ctx = canvas.getContext("2d");
			var x = canvas.width / 2;
			var y = canvas.height / 3;
			var radius = canvas.height / 4;
			var mark = "";
			if(percent >= 90)
				mark = "veryGood";
			else
			{
				if(percent >= 70 && percent < 90)
					mark = "good";
				else
				{
					if(percent >= 50 && percent < 70)
						mark = "neutral";
					else
						mark = "bad";
				}

			}
			paintFace(mark);
			paintSmile(mark);
			paintText(mark);

			function paintFace(mark) {
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2*Math.PI);
				if(mark == "bad")
					ctx.fillStyle = "red";
				else
					ctx.fillStyle = "yellow";
				ctx.fill();
				ctx.beginPath();
				ctx.arc((x - radius/3), (y - radius/3) , radius/10, 0, 2*Math.PI);
				ctx.arc((x + radius/3), (y - radius/3) , radius/10, 0, 2*Math.PI);
				ctx.fillStyle = "black";
				ctx.fill();								
			}
			function paintSmile(mark) {
				if(mark == "veryGood") {
					ctx.beginPath();
					ctx.arc(x, (y + radius / 4), (radius / 2), Math.PI, 2*Math.PI, true);
					ctx.closePath();
					ctx.fillStyle = "white";
					ctx.fill();
				}
				if(mark == "good") {
					ctx.beginPath();
					ctx.arc(x, (y + radius / 4), (radius / 2), Math.PI, 2*Math.PI, true);
				}
				if(mark == "neutral") {
					ctx.beginPath();
					ctx.moveTo((x - radius / 4), (y + radius / 3));
					ctx.lineTo((x + radius / 4), (y + radius / 3));
				}
				if(mark == "bad") {
					ctx.beginPath();
					ctx.arc(x, (y + radius / 2), (radius / 2), Math.PI, 2*Math.PI, false);
				}
				ctx.strokeStyle = "black";
				ctx.lineWidth = 5;
				ctx.stroke();						
			}
			function paintText(mark){
				var markSymbol;
				if(mark == "veryGood")
					markSymbol = 5;
				if(mark == "good")
					markSymbol = 4;
				if(mark == "neutral")
					markSymbol = 3;
				if(mark == "bad")
					markSymbol = 2;
				ctx.font = "68px sans-serif";
				ctx.fillStyle = "#E11E1E";
				ctx.textAlign = "center";
				ctx.fillText("Your mark is \"" + markSymbol + "\"", (canvas.width / 2), (y + canvas.height / 2));
				ctx.font = "30px sans-serif";
				ctx.fillStyle = "#000000";
				ctx.fillText("Your time: " + timeString, (canvas.width / 2), (y + canvas.height / 2 + 70));
			}
		}
	});

	$("#restart").click(function() {
		location.reload();
	});

	$("#multiTabBtn").click(function() {
		$("body").css("padding", "0");
		$(".userEntry").remove();

		var theTD = 0;
		var colorTD = "aqua";
		createTable("tableId", 10, "60px", "60px", colorTD, "26px");
		createButton();

		$(".colored").click(function() {
				if(theTD)
					theTD.text("");
				$("td").css("backgroundColor", "white");
				$(".topRow td").css({"backgroundColor":colorTD, "fontWeight":"normal"});
				$(".verticalNums").css({"backgroundColor":colorTD, "fontWeight":"normal"});
				theTD = $(this).css({backgroundColor: "yellow", color: "black", fontWeight: "bold"});
				var rowID = $(this).parent().get(0).id;
				var columnID = $(this).get(0).id;
				$(this).text(+rowID.substring(3) * columnID.substring(4));
				$("#" + rowID + " .verticalNums").css({backgroundColor: "yellow", fontWeight: "bold"});
				$("." + columnID).css({backgroundColor: "yellow", fontWeight: "bold"});	
		});

		function createTable(Ident, size, widthTD, heightTD, colorTD, fSize) {
				var clientWidth = $(document).width();
				var divWidth = (parseInt(widthTD) * (size+2) + size*1.5);
				var divShift = Math.round(((clientWidth - divWidth)/2)) + "px";
					
				$("body").append($("<div>").attr({id: Ident}).css({width: divWidth, marginLeft: divShift, marginTop: "10px"}));
				$("#" + Ident).append($("<table>").css({border: "3px solid"}));
				$("table").append($("<tr>").addClass("topRow"));
								
				for(var i = 0; i <= size; i++) {
					$(".topRow").append($("<td>").addClass("cell" + i).css({backgroundColor: colorTD, width: widthTD, height: heightTD, fontSize: fSize}).text(i));
				}
				
				for(var j = 1; j <= size; j++)
				{
					$("table").append($("<tr>").attr({id: ("row" + j)}));
					for(var n = 0; n <= size; n++)
					{
						if(n == 0)
							$("#row" + j).append($("<td>").addClass("verticalNums").css({backgroundColor: colorTD, width: widthTD, height: heightTD, fontSize: fSize}).text(j));
						else
						{
							$("#row" + j).append($("<td>").addClass("colored").attr({id: ("cell" + n)}).css({color: "white", width: widthTD, height: heightTD, fontSize: fSize}));
						}
					}
				}
		}

		function createButton() {
			$("body").append($("<div>")
				.attr({id: "restartDiv"})
				.css({width: "100%", marginTop: "40px", textAlign: "center"}));

			$("#restartDiv").append($("<button>")
				.attr({id: "restartBtn"})
				.css({width: "200px", textAlign: "auto", margin: "0"})
				.text("Restart"));

			$("#restartBtn").click(function() {
				location.reload();
			});
		}
	})
});