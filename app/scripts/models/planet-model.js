define(
  [
    'jquery',
    'chance'
  ], function($, Chance) {
  var PlanetModel = function() {
    this.chance = new Chance();
    this.name = this.chance.last() + this.chance.character() + this.chance.natural({min: 100, max: 999});

    this.init = function() {
      this.moralStanding = 'GOOD|EVIL';
      this.hasGasStation = false;
      this.location = {x: 'a number', y: 'a number'};
      this.strength = this.chance.natural({min: 5, max: 25});
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
