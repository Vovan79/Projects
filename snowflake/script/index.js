$(document).ready(function() {
	var canvas = $("canvas")[0];					//the canvas identificator
	
	//Setting the size of the canvas and the drawing radius
//====================Mobile devices code start=======================================================================================================================	
	if(navigator.userAgent.indexOf("iPhone") != -1 || navigator.userAgent.indexOf("Android") != -1) {
		var size = $(window).width() < $(window).height() ? $(window).width() : $(window).height();			//defining of the window width of the mobile device
		$(canvas).attr({width:size});			//setting the width of the canvas
		$(canvas).attr({height:size});			//setting the height of the canvas
		var radius = size / 2 - 3;				//setting of the radius of the drawing field (-3px for shadow)

		document.addEventListener("touchstart", touchHandler, true);	//listening the the touch events and appointing the handler
		document.addEventListener("touchmove", touchHandler, true);
		document.addEventListener("touchend", touchHandler, true);
		document.addEventListener("touchcancel", touchHandler, true);

		//The simulation function of the touch events in the mobile devices
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

		//Localize the footer on the page when the orientation of the page is changed
		$(window).on("orientationchange", function() {
			this.location.reload();
		});
	}
//====================Mobile devices code end=========================================================================================================================
	else {
		var size = $(window).height();			//defining of the window height of the desktop
		$(canvas).attr({width:size});			//setting the width of the canvas
		$(canvas).attr({height:size});			//setting the height of the canvas
		var radius = size / 2 - 3;				//setting of the radius of the drawing field (-3px for shadow)

		$("#control").css({display:"block", left:(size + 10) + "px"});
	}

	var ctx = canvas.getContext("2d");			//the context of the canvas
	var numOfSectors = 36;						//the number of the drawing sectors
	var pointsDistance = 20;					//the distance between points of the line when drawing top and bottom lines
	var pointsArr = [];							//the array of points
	var point = {};								//the current point	
	var startPoint = {};						//the start drawing point by mousedown
	var pointTop = {};							//the top point above the drawing line
	var pointBot = {};							//the bottom point under the drawing line
	var drawing = false;						//drawing ON/OFF
	var fieldColor = "rgba(255, 255, 0, 0.7)";	//the color of the drawing field
	var radianColor = "lightgrey";				//the color of the radian lines	
	var radianWidth = 1;						//the width of the radian lines
	var lineColor = "rgba(255, 0, 0, 1)";		//the color of the radian lines	
	var lineWidth = 1;							//the width of the radian lines

	//Preparation of the field for drawing lines 
	prepareField();								

	//Start the drawing of the lines
	$("#canvas").mousedown(function(e) {
		ctx.strokeStyle = lineColor;											//the color of the lines
		ctx.lineWidth = lineWidth;
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.shadowBlur = 3;
		ctx.shadowColor = "black";												//the width of the lines
		drawing = true;															//drawing ON
		point = {x:(e.clientX - radius), y:(e.clientY - radius)};				//the current point's coordinates
		startPoint = {x:(e.clientX - radius), y:(e.clientY - radius)};			//the start point's coordinates (now startPoint = point)
	
		//Checking the point is in the field or not 
		if(pointInField(point)) {												
			pointsArr.push(point);												//adding the current point to the points array
			ctx.beginPath();													//begining of the drawing on the canvas
			$(this).css({cursor:"pointer"});									//setting the sursor's style
		}
		else
			return;
	});

	//Drawing the lines by mousemove when mousedown (drawing = true)
	$("#canvas").mousemove(function(e) {
		//Checking the drawing ON or OFF
		if(drawing) {														
			point = {x:(e.clientX - radius), y:(e.clientY - radius)};			//the current point's coordinates
			//Checking the point is in the field or not
			if(pointInField(point)) {
				//Checking the distance between points of the line in the field
			/*	if(distPoints(startPoint, point) > pointsDistance) {
					var lengthToPoint = Math.sqrt(point.x*point.x + point.y*point.y);
					var gamma = Math.acos(point.x/lengthToPoint);
					var alfa = (Math.PI/180)*(360/numOfSectors);
					//Checking the point's position on the grid of coordinates 
					if((point.x>0 && point.y < 0) || (point.x<0 && point.y>0)) {
						pointTop.x = lengthToPoint*Math.cos(gamma + alfa/2);
						pointTop.y = 2 * point.y - lengthToPoint*Math.sin(Math.asin(point.y/lengthToPoint) + alfa/2);
						pointBot.x = lengthToPoint*Math.cos(gamma - alfa/2);
						pointBot.y = 2 * point.y - lengthToPoint*Math.sin(Math.asin(point.y/lengthToPoint) - alfa/2);
					}
					else {
						pointTop.x = lengthToPoint*Math.cos(gamma + alfa/2);
						pointTop.y = lengthToPoint*Math.sin(Math.asin(point.y/lengthToPoint) + alfa/2);
						pointBot.x = lengthToPoint*Math.cos(gamma - alfa/2);
						pointBot.y = lengthToPoint*Math.sin(Math.asin(point.y/lengthToPoint) - alfa/2);
					}
					//Rotating and drawing top and bottom lines
					for(var i = 0; i < numOfSectors; i++) {
						ctx.rotate((360/numOfSectors) * Math.PI/180);			//setting the degree of rotating
						ctx.moveTo(point.x, point.y);							//start of the top line
						ctx.lineTo(pointTop.x, pointTop.y);						//end of the top line
						ctx.moveTo(point.x, point.y);							//start of the bottom line
						ctx.lineTo(pointBot.x, pointBot.y);						//end of the bottom line
					}	
					ctx.stroke();												//drawing the lines on the canvas
					startPoint.x = point.x;										//setting the startPoint after drawing top and bottom lines
					startPoint.y = point.y;						
				}	*/
				if(distPoints(startPoint, point) > pointsDistance) {
					var lengthToPoint = Math.sqrt(point.x*point.x + point.y*point.y);
					ctx.beginPath();
					ctx.arc(0, 0, lengthToPoint, 0, 2*Math.PI);					//drawing a new circle
					startPoint.x = point.x;										//setting the startPoint after drawing the circle
					startPoint.y = point.y;		
					ctx.stroke();	
					ctx.closePath();			
				}				
				//Rotating and drawing the lines on the field	
				for(var i = 0; i < numOfSectors; i++) {							
					ctx.rotate((360/numOfSectors) * Math.PI/180);				//setting the degree of rotating
					ctx.moveTo(pointsArr[pointsArr.length-1].x, pointsArr[pointsArr.length-1].y);
					ctx.lineTo(point.x, point.y);
				}	
				ctx.stroke();													//drawing the lines on the canvas
				pointsArr.push(point);											//adding the current point to the points array
			}
			else
				return;
		}
		else
			return;
	});

	//Stop of the drawing lines by mouseup
	$(window).mouseup(function() {
		ctx.closePath();														//closing of the drawing pathes on the canvas
		drawing = false;														//drawing OFF
		$("#canvas").css({cursor:"default"});									//setting the default cursor's style
	});

	//The preparation function for the drawing field
	function prepareField() {
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 0;
		ctx.shadowColor = "";
	
		ctx.lineWidth = radianWidth;											//the width of the radians lines
		ctx.strokeStyle = radianColor;											//the color of the radians lines
		ctx.fillStyle = fieldColor;												//the color of the drawing field

		ctx.beginPath();														//drawing of the round drawing field
		ctx.arc(radius, radius, radius, 0, 2*Math.PI);
		ctx.translate(radius, radius);											//setting the grid of coordinates in the center of the canvas 

		for(var j = 0; j < numOfSectors; j++) {
			ctx.rotate((360/numOfSectors) * Math.PI/180);						//setting the degree of rotating
			ctx.moveTo(0, 0);													//start of the radian lines
			ctx.lineTo(radius, 0);												//end of the radian lines
		}	
		ctx.fill();																//filling the drawing field by the color
		ctx.stroke();															//drawing of the radian lines		
		ctx.closePath();														//closing of the drawing pathes on the canvas
	}

	//The function to check the current point is in the drawing field or not
	function pointInField(point) {
		var length = Math.sqrt(point.x*point.x + point.y*point.y);				//the lenght from the point(0; 0) to the current point
		//compearing the length from point(0; 0) to the current point and the radius of the drawing field 
		if(length < radius)														
			return true;
		else
			return false;
	}

	//The definition function for the distance between two points
	function distPoints(startPoint, point) {
		var lenght1 = Math.sqrt(point.x*point.x + point.y*point.y);							//the lenght from the point(0; 0) to the current point
		var lenght2 = Math.sqrt(startPoint.x*startPoint.x + startPoint.y*startPoint.y);		//the lenght from the point(0; 0) to the startPoint
		return dist = Math.abs(lenght1 - lenght2);											//the absolute value of the distance
	}

//=======================================CONTROL PANEL===================================================================================================================	

	//Appliing new values of drawing
	$("button").click(function() {
		ctx.translate(-radius, -radius);				//setting the grid of coordinates in the start position
		ctx.clearRect(0, 0, size, size);				//clearing the canvas

		fieldColor = $("#fieldColor").val();			//setting new values of drawing from control panel
		radianColor = $("#radianColor").val();
		lineColor = $("#lineColor").val();
		lineWidth = $("#lineWidth").val();
		pointsDistance = $("#distance").val();
		numOfSectors = $("#numOfSectors").val();

		prepareField();									//preparation of the field for drawing lines

		ctx.fillStyle = fieldColor;						//appliing new values of drawing from control panel
		ctx.fill();
		ctx.lineWidth = radianWidth;
		ctx.strokeStyle = radianColor;
		ctx.stroke();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = lineColor;
	});

	$("#lineWidth").val(lineWidth);
	$("#lineWidthValue").val(lineWidth);
	$("#distance").val(pointsDistance);
	$("#distanceValue").val(pointsDistance);
	$("#numOfSectors").val(numOfSectors);
	$("#numOfSectorsValue").val(numOfSectors);

	//Showing the value of the line width by changing
	$("#lineWidth").change(function() {
		$("#lineWidthValue").val($(this).val());
		lineWidth = $(this).val();
	});

	//Showing the value of the distance from the points by changing
	$("#distance").change(function() {
		$("#distanceValue").val($(this).val());
		pointsDistance = $(this).val();
	});

	//Showing the value of the number of the sectors by changing
	$("#numOfSectors").change(function() {
		$("#numOfSectorsValue").val($(this).val());
		numOfSectors = $(this).val();
	});

	//Setting new color of the drawing lines
	$("#lineColor").change(function() {
		lineColor = $(this).val();
	});
});