(function($, undefined) {
	$(document).ready(function() {
		var gameInited = false;
		var gamePause = false;
		var gameOverValue = false;
				
		window.onblur = function() {gamePause = true;}		//pause on if the window is onblur

		window.onfocus = function() {gamePause = false;}	//pause off if the window is  onfocus

		$(document).keydown(function(event) {				//control's keys of the application (start, reload, exit)
			//alert(event.keyCode);
			if(event.keyCode == 83 && gameInited == false) {		//start the game by keyboard
				initGame();
				gameInited = true;
			}

			if(event.keyCode == 82)							//reload the game by keyboard
				location.reload();
		});
			
		$("#start").click(function() {						//start the game by mouse click
			if(gameInited == false) {
				initGame();
				gameInited = true;	
			}
		});

		$("#reload").click(function() {						//reload the game by mouse click
			//window.location.reload();
			location.reload();
		});

		function initGame() {								//initialization of a new game
			var hours = 0;
			var minutes = 0;
			var seconds = 0;
			var timeString;
			setInterval(timing, 1000);
			
			var fieldH = parseInt($("#field").height());
			var fieldW = parseInt($("#field").width());
			var rocketsArr;
			var enemiesArr;
			var cloudsArr;
			var rocketSpeed = 10;
			var enemySpeed = 5;
			var cloudSpeed = 1;
			var rocketNum = 10;
			var enemiesFired = 0;
			var enemiesLost = 0;
			var score = 0;
			var speedTimer = 0;
			$("#time").text("00:00:00");
			$("#rocketsNumber").text(rocketNum);
			$("#enemyFired").text(enemiesFired);
			$("#enemyLost").text(enemiesLost);	
			$("#score").text(score);
			var alarmSound = new Audio();

			var myPlane = {};
			myPlane.X = fieldW / 2 - 45;
			myPlane.Y = fieldH - 136;

			myPlane.image = document.createElement("img");	//creating myPlane picture
			$("#field").append(myPlane.image);
			$(myPlane.image).attr({"id": "my_plane", "src": "img/my_plane.png"});
			$(myPlane.image).css({top: myPlane.Y, left: myPlane.X, visibility: "visible", zIndex: 2});
			
			myPlane.sound = document.createElement("audio");//creating myPlane sound
			$("#field").append(myPlane.sound);
			$(myPlane.sound).attr({"src": "media/myPlane.wav", "autoplay": "autoplay", "loop": "loop"});
			
			createEnemy();									//creating the first enemy
			for(let c = 0; c < 5; c++)
			{
				createCloud();								//creating the first five clouds
			}

			setInterval(playing, 50);						//the program analizes objects's positions every 50 mseconds
			setInterval(createEnemy, 5000);					//a new enemy plane is created every 5 seconds 
			setInterval(createCloud, 1000);					//a new cloud is created every 1 second
			
			$(document).keydown(function(event) {			//control's keys of the game action

				if(event.keyCode == 32) {					//shooting a new rocket of myPlane
					if(rocketNum <= 0) {
						return;	
					}
					else {
						$("#alarm").css({opacity: 0});
						let rocket = createRocket(myPlane.X, myPlane.Y);		//creating a new rocket of myPlane
					}
					rocketNum--;
					if(rocketNum == 0) {
						$("#alarm").css({opacity: 1});
						alarmSound.src = "media/alarm1.wav";
						alarmSound.autoplay = true;
						alarmSound.loop = true;	
					} 
					$("#rocketsNumber").text(rocketNum);
				}

				if(event.keyCode == 37) {					//moving myPlane right
					if(myPlane.X <= 10)
						myPlane.X == 10;
					else {
						myPlane.X -= 10;
						$("#my_plane").css({left: (myPlane.X + "px")});	
					}
				}

				if(event.keyCode == 39) {					//moving myPlane left
					if(myPlane.X >= (fieldW - 100))
						myPlane.X == fieldW - 100;
					else {
						myPlane.X += 10;
						$("#my_plane").css({left: (myPlane.X + "px")});
					}	
				}
			});

			function createRocket(x, y) {					//function of creating a new rocket picture
				let imgRocket = document.createElement("img");
				$("#field").append(imgRocket);
				$(imgRocket).addClass("rockets");
				$(imgRocket).attr({"src": "img/rocket.png"});
				$(imgRocket).css({top: y, left: (x + 43), visibility: "visible", zIndex: 1});
			}

			function createEnemy() {						//function of creating a new Enemy picture and a new sound
				if(gamePause) return;

				let n = Math.ceil(Math.random() * 3);
				let w = Math.ceil(Math.random() * (fieldW - 200) + 100);

				let imgEnemy = document.createElement("img");		//creating a new Enemy picture
				$("#field").append(imgEnemy);
				$(imgEnemy).addClass("enemies");
				$(imgEnemy).attr({"src": "img/plane_" + n + ".png"});
				$(imgEnemy).css({top: -70, left: w, visibility: "visible", zIndex: 1});
				
				imgEnemy.sound = document.createElement("audio");		//creating a new Enemy sound
				$("#field").append(imgEnemy.sound);
				$(imgEnemy.sound).attr({"src": "media/enemy.wav", "autoplay": "autoplay", "loop": "loop"});
			}

			function createCloud() {						//function of creating a new cloud
				if(gamePause) return;

				let n = Math.ceil(Math.random() * 13);
				let w = Math.ceil(Math.random() * fieldW - 200);

				let imgCloud = document.createElement("img");
				$("#field").append(imgCloud);
				$(imgCloud).addClass("clouds");
				$(imgCloud).attr({"src": "img/clouds/" + n + ".png"});
				$(imgCloud).css({top: -150, left: w, visibility: "visible", zIndex: 5});
			}

			function playing() {							//function of watching the game and changing the positions of objects

				if(gamePause) {
					$(myPlane.sound).attr({"src": ""});
					enemiesArr = $(".enemies");
					for(let i = 0; i < enemiesArr.length; i++) {
						enemiesArr[i].sound.src = "";
					}
					return;
				}

				if($(myPlane.sound).attr("src") == "")
					$(myPlane.sound).attr({"src": "media/myPlane.wav", "autoplay": "autoplay", "loop": "loop"});
				
				enemiesArr = $(".enemies");
				for(let i = 0; i < enemiesArr.length; i++) {
					if(enemiesArr[i].sound.src == "")
						enemiesArr[i].sound.src = "media/enemy.wav";
				}

				rocketsFly();
				enemiesFly();
				cloudsFly();

				let posXEnemy;
				let posYEnemy;
				let posXRocket;
				let posYRocket;
				let posXMyPlane = parseInt($("#my_plane").css("left"));
				let posYMyPlane = parseInt($("#my_plane").css("top"));
		
				for(let j = 0; j < enemiesArr.length; j++) {						//watching the positions of enemies
					posXEnemy = parseInt($(enemiesArr[j]).css("left"));
					posYEnemy = parseInt($(enemiesArr[j]).css("top"));

					if(((posXEnemy + 50) > posXMyPlane) && ((posXEnemy - 50) < posXMyPlane) &&
							((posYEnemy + 70) > posYMyPlane) && (posYEnemy < (posYMyPlane + 100))) {
								bigBang(posXMyPlane, posYMyPlane, enemiesArr[j]);						//the bang of myPlane and an enemy if they are crossed
								gameOverValue = true;
					}
		
					for(let i = 0; i < rocketsArr.length; i++) {
						posXRocket = parseInt($(rocketsArr[i]).css("left"));
						posYRocket = parseInt($(rocketsArr[i]).css("top"));

						if((posXRocket > (posXEnemy + 20)) && (posXRocket < (posXEnemy + 70)) &&
							((posYEnemy + 80) > posYRocket)) {
								enemyBang(posXRocket, posYRocket, rocketsArr[i], enemiesArr[j]);		//the bang of an enemy if it and a rockets are crossed 
						}						
					}	
				}
			}

			function rocketsFly() {							//function of moving my rockets
				rocketsArr = $(".rockets");
			
				if(rocketsArr.length == 0) return;

				for(var i = 0; i < rocketsArr.length; i++) {
					let y = parseInt($(rocketsArr[i]).css("top"));
					$(rocketsArr[i]).css({top: y-rocketSpeed});
					if(parseInt($(rocketsArr[i]).css("top")) <= -30) {
						$(rocketsArr[i]).remove();
					}
				}
			}		

			function enemiesFly() {							//function of moving enemies
				enemiesArr = $(".enemies");

				if(enemiesArr.length == 0) return;
				if((minutes - speedTimer) >= 1 && minutes < 7) {
					enemySpeed++;
					speedTimer = minutes;
				}

				for(let i = 0; i < enemiesArr.length; i++) {
					let y = parseInt($(enemiesArr[i]).css("top"));
					$(enemiesArr[i]).css({top: y+enemySpeed});
					if(parseInt($(enemiesArr[i]).css("top")) > parseInt($("#field").css("height"))) {
						if(gameOverValue == false) {
							enemiesLost++;
							score -= 100;
							$("#score").text(score);
							$("#enemyLost").text(enemiesLost);	
						}
						$(enemiesArr[i].sound).remove(); 
						$(enemiesArr[i]).remove();
					}
				}
			}

			function cloudsFly() {							//function of moving clouds
				cloudsArr = $(".clouds");

				if(cloudsArr.length == 0) return;

				for(let i = 0; i < cloudsArr.length; i++) {
					let y = parseInt($(cloudsArr[i]).css("top"));
					$(cloudsArr[i]).css({top: y+cloudSpeed});
					if(parseInt($(cloudsArr[i]).css("top")) > parseInt($("#field").css("height"))) {
						$(cloudsArr[i]).remove();
					}
				}
			}

			function bigBang(x, y, enemy) {					//function of the bang of myPlane and an enemy
				enemiesFired++;
				$("#enemyFired").text(enemiesFired);
				score += 10;
				$("#score").text(score);
				
				soundBang("media/bigBang.mp3");				//playing the sound of the bang
				let imgBang = document.createElement("img");
				$("#field").append(imgBang);
				$(imgBang).attr({"src": "img/big_bang_5.png"});
				$(imgBang).css({top: (y - 20), left: (x + 20), width : 50, height : 50, visibility: "visible", zIndex: 3});
				$(imgBang).animate({top: (y - 110), left: (x - 80), width: 250, height: 250}, 200);
				
				enemy.sound.remove();
				enemy.remove();
				myPlane.sound.remove();
				$("#my_plane").remove();
				alarmSound.src = "";

				setTimeout(gameOver, 1000);						//the end of the game if myPlane is banged
				
				function gameOver() {							//function of the end the game
					$(imgBang).animate({opacity: 0}, 3000);
					
					let color = "red";
					let messageOver = document.createElement("div");
					$("#field").append(messageOver);
					$(messageOver).css({position: "absolute", left: "calc(50% - 200px)", top: (document.documentElement.clientHeight / 2 - 200), width: 400, height: 200});
					$(messageOver).css({backgroundColor: color, border: "solid 3px", borderRadius: "20px",  zIndex: 10, textAlign: "center"});

					let messageButton = document.createElement("button");
					$(messageOver).append(messageButton);
					$(messageButton).text("GAME OVER!!!");
					$(messageButton).css({left: 100, top: 100, width: 200, height: 50, textAlign: "center", marginTop: "75px"});
					$(messageButton).css({backgroundColor: "white", border: "solid 1px black", borderRadius: "5px"});
					
					$(messageButton).click(function() {
						window.location.reload();						
					})
					$(document).keydown(function(event) {
						if(event.keyCode == 13 || event.keyCode == 71) {
							window.location.reload();
						}
					})

					setInterval(function() {
						if(color == "red") {
							color = "yellow";
							$(messageOver).css({backgroundColor: color});
						}
						else {
							color = "red";
							$(messageOver).css({backgroundColor: color});	
						}
					}, 1000);
				}
			}

			function enemyBang(x, y, rocket, enemy) {		//function of the bang of an enemy and a rocket
				soundBang("media/bang.mp3");				//playing the sound of the bang
				enemiesFired++;
				$("#enemyFired").text(enemiesFired);
				score += 10;
				$("#score").text(score);

				let imgEnemyBang = document.createElement("img");
				$("#field").append(imgEnemyBang);
				$(imgEnemyBang).attr({"src": "img/enemy_bang_2.png"});
				$(imgEnemyBang).css({top: (y - 20), left: (x + 20), width : 20, height : 20, visibility: "visible", zIndex: 3});
				$(imgEnemyBang).animate({top: (y - 50), left: (x - 40), width: 100, height: 100}, 200);

				if(rocketNum == 0) {
					$("#alarm").css({opacity: 0});
					alarmSound.src = "";
				}
				rocketNum++;
				$("#rocketsNumber").text(rocketNum);
				rocket.remove();
				enemy.sound.remove();
				enemy.remove();

				$(imgEnemyBang).animate({opacity: 0}, 1000);
			}

			function soundBang(src) {						//function of creating the sound of a bang
				let audio = new Audio();
				audio.src = src;
				audio.autoplay = true;
			}

			function timing() {								//function of the game's timing
				if(gamePause || gameOverValue) return;
				let hoursStr, minutesStr, secondsStr;

				seconds++;
				if(seconds == 60) {
					seconds = 0;
					minutes++;
					if(minutes == 60) {
						minutes = 0;
						hours++;
					}
				}

				seconds < 10 ? secondsStr = ("0" + seconds) : secondsStr = seconds;
				minutes < 10 ? minutesStr = ("0" + minutes) : minutesStr = minutes;
				hours < 10 ? hoursStr = ("0" + hours) : hoursStr = hours;

				timeString = hoursStr + ":" + minutesStr + ":" + secondsStr;
				$("#time").text(timeString);
			}			
		}
	});
})(jQuery);