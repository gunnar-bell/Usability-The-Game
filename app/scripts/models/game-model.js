define(
	[
		'solrSystemModel',
		'playerModel'
	],
	function(SolrSystemModel, PlayerModel) {
	var GameModel = function(options) {
		this.init = function() {
			// set up the state and all event listeners
			this.player = new PlayerModel();
			this.buildMap();
		}
		this.buildMap = function() {
			// feissal's code
		}
	}

	return GameModel;
});
