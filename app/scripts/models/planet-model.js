define([], function() {
  var PlanetModel = function(options) {
    this.init = function() {
      this.moralStanding = 'GOOD|EVIL';
    }
    this.player = 'x';
  }

  return PlanetModel;
});
