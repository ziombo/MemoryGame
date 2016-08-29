(function () {
	var currentGame = {};

	$("#start-game").click(function () {
		currentGame = new game();
		currentGame.chooseRandom();
	});
	$(document).on("click", "div.active", function () {
		if ($(this).attr('class').split(' ')[0] != currentGame.pattern[currentGame.currentUserMove]) {
			$(".active").removeClass("active");
			currentGame.playSound(0);
			currentGame = {};
		} else {
			currentGame.playSound(Number($(this).attr('class').split(' ')[0]));
			if (currentGame.currentUserMove == currentGame.pattern.length - 1) {
				currentGame.currentUserMove = 0;
				currentGame.score += 1;
				currentGame.updateScore();
				$(".active").removeClass("active");
				setTimeout(function () {
					currentGame.chooseRandom();
				}, 600);
			}
			else {
				currentGame.currentUserMove++;
			}
		}
	});

	var game = function () {
		var gameInstance = this;
		this.score = 0;
		this.gameOngoing = true,
		this.currentUserMove = 0,
		this.pattern = [],
		this.blink = function (index) {
			var currentBtn = $("#btn-" + this.pattern[index]);
			currentBtn.addClass("blink");
			gameInstance.playSound(this.pattern[index]);
			setTimeout(function () {
				currentBtn.removeClass("blink");
				if (index < gameInstance.pattern.length) {
					setTimeout(function () {
						gameInstance.blink(++index);
					}, 100);
				} else {
					setTimeout(function () {
						$(".play-btn").addClass("active");
					}, 150);
				}
			}, 300);
		},
		this.chooseRandom = function () {
			this.pattern.push(Math.floor((Math.random() * 4) + 1));
			this.blink(0);
		},
		this.playSound = function (number) {
			var audio = new Audio();
			switch (number) {
				case (1):
					audio = new Audio('sound/415.wav');
					break;
				case (2):
					audio = new Audio('sound/310.wav');
					break;
				case (3):
					audio = new Audio('sound/252.wav');
					break;
				case (4):
					audio = new Audio('sound/209.wav');
					break;
				case (0):
					audio = new Audio('sound/99.wav');
					break;
			};
			audio.play();
		},
		this.updateScore = function () {
			$("#score").html("Score: " + this.score);
		}
		this.updateScore();
	};
})();

