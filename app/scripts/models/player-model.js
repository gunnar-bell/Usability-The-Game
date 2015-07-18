define([
      'spaceshipModel'
    ], function(SpaceshipModel) {
  var PlayerModel = function() {
    this.init = function() {
      this.spaceship = new SpaceshipModel();
      this.spaceship.refuel(); // for testing
      this.resources = {'stardust':5};
      this.currentPlanet = 'earth';
      console.log('building playerModel!!');
    };
    this.position  = {'x':100,'y':100};//this.currentPlanet.location;
  };

  return PlayerModel;
});
