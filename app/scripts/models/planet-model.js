define([], function() {
  var PlanetModel = function(planetName) {
    this.name = planetName;
    this.init = function(
	moralStanding,
	hasGasStation,
	strength
	) {
      this.moralStanding = 'GOOD|EVIL';
      this.hasGasStation = hasGasStation;
      this.location = {x: 'a number', y: 'a number'};
      this.strength = strength;
    }
    this.getLocation = function() {
    	return this.location;
    }
    this.missions = ['mission', 'objects'];
}

  return PlanetModel;
});
