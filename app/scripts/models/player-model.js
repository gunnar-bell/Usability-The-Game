define([
      'jquery',
      'chance',
      'spaceshipModel',
      'planetModel'
    ], function($, Chance, SpaceshipModel, PlanetModel) {
  var PlayerModel = function() {
    this.chance = new Chance();
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

    this.moveTo = function(planetModel) {
      this.currentPlanet = planetModel;
      // this.currentPlanet.init();
      this.position  = this.currentPlanet.position;
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

    this.calculateFuelUsage = function(solrSystem) {
      return lineDistance(this.position, solrSystem.position);
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
