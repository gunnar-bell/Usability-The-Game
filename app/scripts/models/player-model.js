define([
      'spaceshipModel',
      'planetModel'
    ], function(SpaceshipModel, PlanetModel) {
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

    this.setPlanet = function(planetName) {
      this.currentPlanet = new PlanetModel(planetName);       
      this.currentPlanet.init();
      this.position  = this.currentPlanet.getLocation();
    }

    this.refuelSpaceship = function() {
      if (this.currentPlanet.hasGasStation) {
        var refillCost = this.currentPlanet.strength * .25;
        var refill = confirm('Fuel up here? It will cost ' + refillCost + ' grams of stardust.');
        if (refill) {
          this.spaceship.refuel();
          this.stardust -= refillCost;
        }
      }
    }
  };

  return PlayerModel;
});
