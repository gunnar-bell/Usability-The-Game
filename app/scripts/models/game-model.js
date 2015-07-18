define(['solrSystemModel'], function() {
	var GameModel = function(options) {
		this.player = new PlayerModel(/*options?*/);
		this.universe = 'y';//new UniverseModel(/*options*/);
	}

	return GameModel;
});
