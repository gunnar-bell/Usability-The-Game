define([], function() {
	var PlayerModel = function(planet='earth') {
    this.init = function() {
		  this.spaceship = new SpaceshipModel(/*options?*/);
      this.resources = {'stardust':5}; //
      this.currentPlanet = 'earth';
	    console.log('building playerModel!!');
    };
    this.position  = this.currentPlanet.location;
	};

	return PlayerModel;
});
