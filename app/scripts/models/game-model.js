define([], function() {
	var GameModel = function(options) {
		this.player = 'x';//new PlayerModel(/*options?*/);
		this.universe = 'y';//new UniverseModel(/*options*/);
	}

	return GameModel;
});
