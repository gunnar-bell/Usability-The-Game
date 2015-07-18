define(
	[
		'universeModel',
		'solrSystemModel',
		'playerModel'
	],
	function(UniverseModel, SolrSystemModel, PlayerModel) {
	var GameModel = function(options) {
		this.init = function() {
			// set up the state and all event listeners
			this.player = new PlayerModel();
			this.buildMap();
		}
		this.buildMap = function() {
			// feissal's code
			console.log('building map!!');
		}
	}

	return GameModel;
});
