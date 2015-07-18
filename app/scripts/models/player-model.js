define([], function() {
	var PlayerModel = function(options) {
    this.init = function() {
		  this.spaceship = new SpaceshipModel(/*options?*/);
    };
    this.position  = {'x':100, 'y':100};
    this.resources = {'stardust':5}; //
    this.currentPlanet = 'earth';
	    console.log('building playerModel!!');
	};

	return PlayerModel;
});
