//Main script of the application
function initMap() {
	var mapOptions = {
		center:new google.maps.LatLng(49.70388401,36.04512500), 
		zoom:mapZoom, 
		mapTypeId:"roadmap",
		zoomControl:true,
		scaleControl:true,
		streetViewControl:true,
		rotateControl:true,
		draggableCursor:"default"
	};
	var map = new google.maps.Map(document.getElementById("mapdiv"), mapOptions);
	var infowindow = new google.maps.InfoWindow({content:""});
	var input = document.getElementById("searchField");
	var searchBox = new google.maps.places.SearchBox(input);

	var boxMarkerArray = [];
	var editingTime = false;
	var editableBoxMarker = null;

	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();
		if(places.length == 0) {
			return;
		}
		var bounds = new google.maps.LatLngBounds();
		
		places.forEach(function(place) {
			if(!place.geometry) {
				return;
			}
			if(place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			}
			else {
				bounds.extend(place.geometry.location);			
			}
		});
		map.fitBounds(bounds);
		$("#searchdiv input").val("");
	});

	/*map.addListener("click", function(e) {
		alert(e.latLng);
	});*/

	getCoresFromDataBase();
	
	//================================================================================================================================================================
	
	//Getting cores information from the data base 		
	function getCoresFromDataBase() {
		var request = new XMLHttpRequest();
		var params = "data=cores";
				
		request.open("POST", "script/queryCores.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		//This header must be for the var params
		request.send(params);
		
		request.onreadystatechange = function() {
			if(this.readyState == 4) {
				if(this.status == 200 && this.responseText != null) {
					var cores = parsingData(this.response);
					createCoresImages(cores);
				}
				else alert("AJAX failure");
			}
		}

		//Parsing data from the server
		function parsingData(str) {
			var arr = [];
			var parseStr = str.split(' &sep ');
			for(var i = 0; i < parseStr.length - 1; i++) {
				arr.push(JSON.parse(parseStr[i]));
			}
			return arr;
		}	
	}

	//================================================================================================================================================================

	//Getting olts of the core from the data base 		
	function getOltsFromDataBase(coreImg, core, coreName) {
		var request = new XMLHttpRequest();
		var params = "data=" + coreName;
				
		request.open("POST", "script/queryOlts.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		//This header must be for the var params
		request.send(params);
		
		request.onreadystatechange = function() {
			if(this.readyState == 4) {
				if(this.status == 200 && this.responseText != null) {
					if(this.response == "user")
						return false;
					var olts = parsingData(this.response);
					var contentString = "<div style='font-weight:bold; background:lightgreen'>Name: "+core.name+"<br>" + "Router: "+core.router+"<br>";
					for(var i = 0; i < olts.length; i++) {
						contentString += "Olt" + [i+1] + ": " + olts[i].model + "<br>";
					}
					contentString += "Address: "+core.addr+"</div>"; 
					infowindow.open(map, coreImg);
					infowindow.setContent(content = contentString);	
				}
				else alert("AJAX failure");
			}
		}

		//Parsing data from the server
		function parsingData(str) {
			var arr = [];
			var parseStr = str.split(' &sep ');
			for(var i = 0; i < parseStr.length - 1; i++) {
				arr.push(JSON.parse(parseStr[i]));
			}
			return arr;
		}	
	}

	//================================================================================================================================================================

	//Getting boxes of the core from the data base
	function getBoxesFromDataBase(core) {
		var core = core;
		var request = new XMLHttpRequest();
		var params = "data=" + core.name;
				
		request.open("POST", "script/queryBoxes.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		//This header must be for the var params
		request.send(params);
		
		request.onreadystatechange = function() {
			if(this.readyState == 4) {
				if(this.status == 200 && this.responseText != null) {
					var boxes = parsingData(this.response);
					createBoxesImages(core, boxes);
				}
				else alert("AJAX failure");
			}
		}

		//Parsing data from the server
		function parsingData(str) {
			var arr = [];
			var parseStr = str.split(' &sep ');
			for(var i = 0; i < parseStr.length - 1; i++) {
				arr.push(JSON.parse(parseStr[i]));
			}
			return arr;
		}	
	}	

	//==================================================================================================================================================================

	//Getting optic lines information from the data base 		
	function getLinesFromDataBase(core, boxes) {
		var core = core;
		var boxes = boxes;
		var request = new XMLHttpRequest();
		var params = "data=" + core.name;
				
		request.open("POST", "script/queryLines.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		//This header must be for the var params
		request.send(params);
		
		request.onreadystatechange = function() {
			if(this.readyState == 4) {
				if(this.status == 200 && this.responseText != null) {
					var lines = parsingData(this.response);
					createLines(core, boxes, lines);
				}
				else alert("AJAX failure");
			}
		}

		//Parsing data from the server
		function parsingData(str) {
			var arr = [];
			var parseStr = str.split(' &sep ');
			for(var i = 0; i < parseStr.length - 1; i++) {
				arr.push(JSON.parse(parseStr[i]));
			}
			return arr;
		}	
	}

	//==================================================================================================================================================================

	//Creating cores images on the map
	function createCoresImages(cores) {
		for(var i = 0; i < cores.length; i++) {
			var corePos = new google.maps.LatLng(+cores[i].lat, +cores[i].lng);		//define of the core's coordinates
			var core = new google.maps.Marker({position:corePos, icon:"images/core_min.png", map:map, title:cores[i].name, draggable:false,		//create the core marker 
												animation:google.maps.Animation.DROP, zIndex:1000});
			
			getBoxesFromDataBase(cores[i]);				//getting boxes information from the data base

			core.addListener("click", function() {
				if(classOfUser == "user")
					return false;
				for(var i = 0; i < cores.length; i++) {
					if(cores[i].name == this.title) {
						getOltsFromDataBase(this, cores[i], cores[i].name);		//get the info block of the core
					} 
				}
			});

			core.addListener("dblclick", function(e) {
				infowindow.close();
				map.setZoom(zoom=15);					//increase the zoom of the map
				map.setCenter(this.getPosition());		//set the core position to the center of the map
			});
		}
	}

	//Creating boxes images on the map
	function createBoxesImages(core, boxes) {
		for(var i = 0; i < boxes.length; i++) {
			var boxPos = new google.maps.LatLng(+boxes[i].lat, +boxes[i].lng);
			var box = new google.maps.Marker({position:boxPos, icon:"images/box.png", map:map, title:boxes[i].name, draggable:false,
												opacity:0.9, zIndex:100});
			boxMarkerArray.push(box);
			
			box.addListener("click", function() {		//show the infoblock of the optic box by the click 
				if(classOfUser == "user")
					return false;

				for(var j = 0; j < boxes.length; j++) {
					if(boxes[j].name == this.title) {
						var box = boxes[j];
					}
				}
				var contentString = "<div style='font-weight:bold; background:lightgreen'>Name: "+box.name+"<br>" + 
										"TrSpl: "+box.trSpl+"<br>" + "SbSpl: "+box.sbSpl+"<br>" + "Address: "+box.addr + "</div>"; 
					infowindow.open(map, this);
					infowindow.setContent(content = contentString);
			});

			box.addListener("dblclick", function() {
				infowindow.close();
				if(editingTime) {
					for(var i = 0; i < boxMarkerArray.length; i++) {
						boxMarkerArray[i].setDraggable(false);
						boxMarkerArray[i].setIcon(icon="images/box.png");
					}				
					this.setDraggable(true);
					this.setIcon(icon="images/box_edit.png");
					editableBoxMarker = this;	
				}
			});
		}
		getLinesFromDataBase(core, boxes);
	}

	//Creating optic lines on the map
	function createLines(core, boxes, lines) {
		for(var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var color = "blue";
			var zindex = 10;

			if(line.startbox[0] == "N") {
				var startPoint = {lat:(+core.lat + 0.00001), lng:(+core.lng + 0.000005)};
				color = "green";
				zindex = 20;
			}
			else {
				for(var j = 0; j < boxes.length; j++) {
					if(line.name.substr(0,3) == "OLM") 
						color = "green";
					if(line.startbox == boxes[j].name) {
						var startPoint = {lat:(+boxes[j].lat + 0.00001), lng:(+boxes[j].lng + 0.000005)};			
					}
				}
			}

			for(var k = 0; k < boxes.length; k++) {
				if(line.endbox == boxes[k].name) {
					var endPoint = {lat:(+boxes[k].lat + 0.00001), lng:(+boxes[k].lng + 0.000005)};			
				}
			}

			var infoPosition = {lat:(+startPoint.lat + +endPoint.lat)/2, lng:(+startPoint.lng + +endPoint.lng)/2};
			var linePath = new google.maps.Polyline({path:[startPoint,endPoint], strokeColor:color, strokeOpacity:0.9, strokeWeight:8, title:line.name,
													position:infoPosition, zIndex:zindex});
			linePath.setMap(map);

			linePath.addListener("click", function() {		//show the infoblock of the optic line by the click
				if(classOfUser == "user")
					return false;

				for(var i = 0; i < lines.length; i++) {
					if(lines[i].name == this.title) {
						var line = lines[i];
					}
				}
				var contentString = "<div style='font-weight:bold; background:yellow'>Name: "+line.name+"<br>" + "Start: "+line.startbox+"<br>" + 
										"End: "+line.endbox+"<br>" + "Fiber: "+line.fibernum+"<br>" + "Length: "+line.length + "</div>";  
				infowindow.open(map);
				infowindow.setContent(content = contentString);	
				infowindow.setPosition(position = this.position);		
			});				
		}
	}

	//=====================================CONTROL PANEL PART===========================================================================================================

	//======================================ADD OBJECTS PART=====================================================================================

	var newObject;
	var addValue;

	$("#addSelection").change(function() {
		$("#editObject").hide();
		if(!$("#addSelection").val() && !$("#deleteSelection").val()) {
			$("#editObject").show();
		}

		addValue = $("#addSelection").val();
		if(addValue == "") {
			$("#newObject").hide();
			$("#addBtn").hide();
		}
		if(addValue == "lines" || addValue == "olts") $("#addBtn").show();
		
		$("#add input").val("");
		$("#add .field").hide();
		$("#add ." + addValue).show();
	});

	$("#newObject").click(function() {
		if(classOfUser == "user" || classOfUser == "optic") {
			return false;
		}
		var center = map.getCenter();
		addValue = $("#addSelection").val();
		
		if(addValue == "cores") {
			$("#addBtn").show();
			newObject = new google.maps.Marker({position:center, icon:"images/core_edit.png", map:map, draggable:true, zIndex:1000});
		}
		if(addValue == "boxes") {
			$("#addBtn").show();
			newObject = new google.maps.Marker({position:center, icon:"images/box_edit.png", map:map, draggable:true, zIndex:1000});
		}
	});

	$(window).keydown(function(e) {
		if(e.keyCode == 27 && newObject.draggable) {
			$("#addBtn").hide();
			newObject.setVisible(false);
			newObject = null;
		}
	});

	$("#addBtn").click(function() {
		if(classOfUser == "user" || classOfUser == "optic") {
			return false;
		}
		var params;
		if(addValue == "cores" || addValue == "boxes") $(this).hide();
		
		var name = $("#add_name").val();
		var nas = $("#add_nas").val();
		var model = $("#add_model").val();
		var router = $("#add_router").val();
		var trspl = $("#add_trspl").val() || "-";
		var sbspl = $("#add_sbspl").val() || "-";
		var startbox = $("#add_startbox").val();
		var endbox = $("#add_endbox").val();
		var fibernum = $("#add_fibernum").val() || "-";
		var length = $("#add_length").val() || "-";
		var addr = $("#add_addr").val() || "null";
		
		if(addValue == "cores" || addValue == "boxes") {
			var position = newObject.getPosition();
			var posLat = position.lat().toFixed(8);
			var posLng = position.lng().toFixed(8);
			newObject.setTitle(title=name);
			newObject.setDraggable(false);
		}
		
		if(addValue == "cores" && checkCoreValues(name, router)) {
			params = "data=cores" + "&name=" + name + "&router=" + router + "&addr=" + addr + "&lat=" + posLat + "&lng=" + posLng;
		}		
		else if(addValue == "boxes" && checkBoxValues(name, nas)) { 
			params = "data=boxes" + "&name=" + name + "&nas=" + nas + "&trspl=" + trspl + "&sbspl=" + sbspl + "&addr=" + addr + "&lat=" + posLat + "&lng=" + posLng;
		}
		else if(addValue == "lines" && checkLinesValues(name, nas, startbox, endbox)) { 
			params = "data=lines" + "&name=" + name + "&nas=" + nas + "&startbox=" + startbox + "&endbox=" + endbox + "&fibernum=" + fibernum + "&length=" + length;
		}
		else if(addValue == "olts" && checkOltsValues(nas, model)) { 
			params = "data=olts" + "&nas=" + nas + "&model=" + model;
		}
		else return;
		
		var request = new XMLHttpRequest();				
		request.open("POST", "script/addNewObject.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		//This header must be for the var params
		request.send(params);
		
		request.onreadystatechange = function() {
			if(this.readyState == 4) {
				if(this.status == 200 && this.responseText != null) {
					alert(this.response);
				}
				else alert("AJAX failure");
			}
		}	
	});

	//============================================================================================================================================

	//Checking values of new objects
	function checkCoreValues(name, router) {
		if(!name || !router) {
			alert("Enter correct data");
			return false;
		}
		else return true;
	}
	function checkBoxValues(name, nas) {
		if(!name || !nas) {
			alert("Enter correct data");
			return false;
		}
		else return true;
	}
	function checkLinesValues(name, nas, startbox, endbox) {
		if(!name || !nas || !startbox || !endbox) {
			alert("Enter correct data");
			return false;
		}
		else return true;
	}
	function checkOltsValues(nas, model) {
		if(!nas || !model) {
			alert("Enter correct data");
			return false;
		}
		else return true;
	}

	//======================================DELETE OBJECTS PART=====================================================================================

	var deleteValue;

	$("#deleteSelection").change(function() {
		$("#editObject").hide();
		if(!$("#addSelection").val() && !$("#deleteSelection").val()) {
			$("#editObject").show();
		}

		deleteValue = $("#deleteSelection").val();
		if(deleteValue == "") 
			$("#deleteBtn").hide();	
		else
			$("#deleteBtn").show();
	
		$("#delete input").val("");
		$("#delete .field").hide();
		$("#delete ." + deleteValue).show();
	});

	$("#deleteBtn").click(function() {
		if(classOfUser == "user" || classOfUser == "optic") {
			return false;
		}
		var params;
		var name_del = $("#delete_name").val();
		var nas_del = $("#delete_nas").val();
		var model_del = $("#delete_model").val();
		
		if(deleteValue == "boxes" && name_del && nas_del) { 
			params = "data=boxes" + "&name=" + name_del + "&nas=" + nas_del;
		}
		else if(deleteValue == "lines" && name_del && nas_del) { 
			params = "data=lines" + "&name=" + name_del + "&nas=" + nas_del;
		}
		else if(deleteValue == "olts" && nas_del && model_del) { 
			params = "data=olts" + "&nas=" + nas_del + "&model=" + model_del;
		}
		else {
			alert("Enter correct data");
			return;
		}

		var confirmValue = confirm("Are you sure to delete this object?");
		if(confirmValue == false) return;
		else {
			var request = new XMLHttpRequest();				
			request.open("POST", "script/deleteObject.php", true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		//This header must be for the var params
			request.send(params);
		
			request.onreadystatechange = function() {
				if(this.readyState == 4) {
					if(this.status == 200 && this.responseText != null) {
						alert(this.response);
					}
					else alert("AJAX failure");
				}
			}
		}	
	});

	//======================================EDIT OBJECTS PART=====================================================================================

	var editValue;

	$("#editSelection").change(function() {
		editValue = $("#editSelection").val();
		if(editValue == "") {
			$("#editBtn").hide();
			$("#saveBtn").hide();
			$("#addObject").show();
			$("#deleteObject").show();	
		}
		else {
			$("#addObject").hide();
			$("#deleteObject").hide();
			$("#editBtn").show();
		}
		
		$("#edit input").val("");
		$("#edit input").attr({disabled:true});
		$("#edit .field").hide();
		$("#edit ." + editValue).show();
	});

	$("#editBtn").click(function() {
		if(classOfUser == "user" || classOfUser == "optic") {
			return false;
		}
		editingTime = true;
		$("#edit input").attr({disabled:false});
		$("#saveBtn").show();
	});

	$("#saveBtn").click(function() {
		if(classOfUser == "user" || classOfUser == "optic") {
			return false;
		}
		editingTime = false;
		$("#edit input").attr({disabled:true});
		$(this).hide();

		var params;
		var name = $("#edit_name").val();
		var nas = $("#edit_nas").val();
		var trspl = $("#edit_trspl").val();
		var sbspl = $("#edit_sbspl").val();
		var startbox = $("#edit_startbox").val();
		var endbox = $("#edit_endbox").val();
		var fibernum = $("#edit_fibernum").val();
		var length = $("#edit_length").val();
		var addr = $("#edit_addr").val();
		
		if(editValue == "boxes" && name && nas) { 
			if(editableBoxMarker) {
				var position = editableBoxMarker.getPosition();
				var posLat = position.lat().toFixed(8);
				var posLng = position.lng().toFixed(8);
				
				params = "data=boxes" + "&name=" + name + "&nas=" + nas + "&trspl=" + trspl + "&sbspl=" + sbspl + "&addr=" + addr + "&lat=" + posLat + "&lng=" + posLng;
				
				editableBoxMarker.setDraggable(false);
				editableBoxMarker.setIcon(icon="images/box.png");
				editableBoxMarker = null;
			}
			else
				params = "data=boxes" + "&name=" + name + "&nas=" + nas + "&trspl=" + trspl + "&sbspl=" + sbspl + "&addr=" + addr;
		}
		else if(editValue == "lines" && name && nas) { 
			params = "data=lines" + "&name=" + name + "&nas=" + nas + "&startbox=" + startbox + "&endbox=" + endbox + "&fibernum=" + fibernum + "&length=" + length;
		}
		else {
			alert("Enter correct data");
			return;
		}

		var confirmValue = confirm("Are you sure to edit this object?");
		if(confirmValue == false) return;
		else {
			var request = new XMLHttpRequest();				
			request.open("POST", "script/editObject.php", true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		//This header must be for the var params
			request.send(params);
		
			request.onreadystatechange = function() {
				if(this.readyState == 4) {
					if(this.status == 200 && this.responseText != null) {
						alert(this.response);
					}
					else alert("AJAX failure");
				}
			}
		}	
	});

	//======================================MEASURING DISTANCES===================================================================================

	var measureDist = false;					
	var pointsArray = [];
	var path = [];
	var poly = new google.maps.Polyline({
		strokeColor: '#CC0099',
		strokeOpacity: 1.0,
		strokeWeight: 3,
		geodesic: true,
		map: map	
	});

	$("#ruler").show();
	$("#ruler img").attr("src", "images/ruler.png");
	$("#ruler").css({top:($(window).height() - 100 + "px")});
	
	$("#ruler img").click(function() {			//start and stop measuring by the click of the ruler
		if(!measureDist) {
			measureDist = true;
			$(this).attr("src", "images/ruleron.png");
		}
		else {
			measureDist = false;
			$(this).attr("src", "images/ruler.png");
			for(var i = 0; i < pointsArray.length; i++) {
				pointsArray[i].setVisible(false);
			}
			pointsArray.length = 0;
			path.length = 0;
			poly.setPath(path);
			infowindow.close();
		}
	});

	//Creating the measuring markers to detect the distance
	map.addListener("click", function(e) {
		if(measureDist) {
			var point = new google.maps.Marker({position:e.latLng, icon:"images/man.png", map:map, draggable:true, zIndex:1000});
			pointsArray.push(point);
			for(var i = 0; i < pointsArray.length; i++) {
				google.maps.event.addListener(pointsArray[i], 'position_changed', drawWay);	
			}
			if(pointsArray.length > 1) {
				drawWay();
			}
		}
		else
			return false;
	});

	//Position of the ruler by resizing the window
	$(window).resize(function() {
		$("#ruler").css({top:($(window).height() - 100 + "px")});
	});

	//Drawing the measuring way
	function drawWay() {
		path.length = 0;
		infowindow.close();
		for(var i = 0; i < pointsArray.length; i++) {
			path.push(pointsArray[i].getPosition());
		}
		poly.setPath(path);
		var distance = google.maps.geometry.spherical.computeLength(path);
		var contentString = parseInt(distance) + " m";

		infowindow.open(map, pointsArray[pointsArray.length-1]);
		infowindow.setContent(content = contentString);
	}

	//======================================SEARCH PANEL============================================================================================

	$("#searchdiv img").click(function() {
		if($(this).hasClass("visible")) {
			$(this).removeClass("visible");
			$("#searchdiv").animate({left: "-360px"}, 1000);
			$("#searchdiv input").val("");
		}
		else {
			$(this).addClass("visible");
			$("#searchdiv").animate({left: "10px"}, 1000);
		}
	});
}