define(
  [
    'jquery',
    'chance'
  ], function($, Chance) {
  var PlanetModel = function(planetName) {
    this.name = planetName;
    this.chance = new Chance();
    this.init = function() {
      this.moralStanding = 'GOOD|EVIL';
      this.hasGasStation = hasGasStation;
      this.location = {x: 'a number', y: 'a number'};
      this.strength = strength;
    }
    this.getLocation = function() {
    	return this.location;
    }
    this.missions = ['mission', 'objects'];

    this.player = 'x';

    this.load = function(planetData) {
      this.position = { 'x': this.chance.floating({min: 0, max: 1}), 'y': this.chance.floating({min: 0, max: 1})};
    }
	}

  return PlanetModel;
});
