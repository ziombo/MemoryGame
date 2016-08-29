(function () {
	var currentGame = {};

	$("#start-game").click(function () {
		//$(this).attr("disabled", true);
		currentGame = new game();
		currentGame.chooseRandom();
	});
	$(document).on("click", "div.active", function () {
		if ($(this).attr('class').split(' ')[0] != currentGame.pattern[currentGame.currentUserMove]) {
			$(".active").removeClass("active");
			currentGame = {};
		} else {
			if (currentGame.currentUserMove == currentGame.pattern.length - 1) {
				currentGame.currentUserMove = 0;
				currentGame.score += 1;
				currentGame.updateScore();
				$(".active").removeClass("active");
				setTimeout(function () {
					currentGame.chooseRandom();
				}, 400);
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
		this.updateScore = function () {
			$("#score").html("Score: " + this.score);
		}
		this.updateScore();
	};
})();

