define([
      'spaceshipModel'
    ], function(SpaceshipModel) {
  var PlayerModel = function() {
    this.init = function() {
      console.log('building playerModel!!');
      this.spaceship = new SpaceshipModel();
      this.health = 90;
      this.resources = {'stardust':5};
      this.currentPlanet = 'earth';
      this.strength = 10;
      this.attack = function(attackee) {
        if (Math.random() > .2) { // 80% chance to hit always?
          attackee.health -= this.strength;
          console.log(attackee + 'hit for ' + this.strength)
        } else {
          console.log('missed!');
        }
      }
    };
    this.position  = {'x':100,'y':100};//this.currentPlanet.location;
  };

  return PlayerModel;
});
