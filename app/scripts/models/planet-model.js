define([], function() {
  var PlanetModel = function(options) {
    this.init = function() {
      this.moralStanding = 'GOOD|EVIL';
      this.location = {x: 'a number', y: 'a number'};
    }
    this.getLocation = function() {
    	return this.location;
    }
    this.missions = ['mission', 'objects'];
    this.player = 'x'; //eh?
  }

  return PlanetModel;
});
