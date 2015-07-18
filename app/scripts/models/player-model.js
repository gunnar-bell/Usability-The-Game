define([], function() {
	var PlayerModel = function(options) {
		this.spaceship = 'x'; //new SpaceshipModel(/*options?*/);
		this.position  = {'x':100, 'y':100};
	    this.resources = {'stardust':5};
	    this.current_planet = 'earth';
	    console.log('building playerModel!!');
	};

	return PlayerModel;
});
