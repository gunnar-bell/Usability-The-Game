define([], function() {
	var PlayerModel = function() {
    this.init = function() {
		  this.spaceship = new SpaceshipModel();
      this.spaceship.refuel();
      this.resources = {'stardust':5}; //
      this.currentPlanet = 'earth';
	    console.log('building playerModel!!');
    };
    this.position  = this.currentPlanet.location;
	};

	return PlayerModel;
});
