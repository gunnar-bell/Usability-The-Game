define([
      'spaceshipModel',
      'planetModel'
    ], function(SpaceshipModel, PlanetModel) {
  var PlayerModel = function() {
    this.init = function() {
      this.spaceship = new SpaceshipModel();
      this.resources = {'stardust':5};
      console.log('building playerModel!!');
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
