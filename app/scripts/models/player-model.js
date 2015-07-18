define([
      'jquery',
      'chance',
      'spaceshipModel',
      'planetModel'
    ], function($, Chance, SpaceshipModel, PlanetModel) {
  var PlayerModel = function() {
    this.chance = new Chance();
    this.fuelFactor = 100000;
    this.activeMissions = [];

    this.init = function() {
      console.log('building playerModel!!');
      this.spaceship = new SpaceshipModel();
      this.health = 90;
      this.resources = {'stardust':5};
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

    this.moveTo = function(locationModel) {
      this.currentLocation = locationModel;
      this.position  = this.currentLocation.position;

      // TODO: We should show the list of available missions here and let the user select the ones he wants. But for now we will just accept the first one
      var missions = this.currentLocation.planets[0].missions;
      if (missions.length > 0) {
        missions[0].activate();
        this.activeMissions.push(missions[0]);
      }
    };

    this.refuelSpaceship = function() {
      // TODO: i changed currentLocation to be a star system, so this check will need to be updated. Sorry!
      if (this.currentLocation.hasGasStation) {
        var refillCost = this.currentLocation.strength * .25;
        var refill = confirm('Fuel up here? It will cost ' + refillCost + ' grams of stardust.');
        if (refill) {
          this.spaceship.refuel();
          this.stardust -= refillCost;
        }
      }
    }

    this.calculateFuelUsage = function(solrSystem) {
      return lineDistance(this.position, solrSystem.position) * this.fuelFactor;
    };

    function lineDistance( point1, point2 ) {
      var xs = 0;
      var ys = 0;

      xs = point2.x - point1.x;
      xs = xs * xs;

      ys = point2.y - point1.y;
      ys = ys * ys;

      return Math.sqrt( xs + ys );
    }
  };

  return PlayerModel;
});
