(function () {
	var newGame = {};

	$("#start-game").click(function () {
		//$(this).attr("disabled", true);
		newGame = new game();
		newGame.chooseRandom();
	});

	var game = function () {
		var gameInstance = this;
		this.gameOngoing = true,
		this.pattern = [1,2,3],
		this.userPattern = [],
		this.blink = function (index) {
			$(".active").removeClass("active");
			var currentBtn = $("#btn-" + this.pattern[index]);
			currentBtn.addClass("blink");
			setTimeout(function () {
				currentBtn.removeClass("blink");
				if (index < gameInstance.pattern.length) {
					gameInstance.blink(++index);
				} else {
					$(".play-btn").addClass("active");
				}
			}, 300);
		},
		this.chooseRandom = function () {
			this.pattern.push(Math.floor((Math.random() * 4) + 1));
			this.blink(0);
		}
	};
})();

