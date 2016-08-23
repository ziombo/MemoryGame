(function () {
	var newGame = {};

	$("#start-game").click(function () {
		//$(this).attr("disabled", true);
		newGame = new game();
		newGame.chooseRandom();
	});
	$(document).on("click", "div.active", function () {
		if ($(this).attr('class').split(' ')[0] != newGame.pattern[newGame.currentUserMove]) {
			$(".active").removeClass("active");
			newGame = {};
		} else {
			if (newGame.currentUserMove == newGame.pattern.length - 1) {
				newGame.currentUserMove = 0;
				setTimeout(function () {
					newGame.chooseRandom();
				}, 200);
			}
			else {
				newGame.currentUserMove++;
			}
		}
	});

	var game = function () {
		var gameInstance = this;
		this.gameOngoing = true,
		this.currentUserMove = 0,
		this.pattern = [],
		this.blink = function (index) {
			$(".active").removeClass("active");
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
					}, 250);
				}
			}, 300);
		},
		this.chooseRandom = function () {
			this.pattern.push(Math.floor((Math.random() * 4) + 1));
			this.blink(0);
		}
	};
})();

