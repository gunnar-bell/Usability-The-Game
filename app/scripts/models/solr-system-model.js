define(
  [
    'jquery',
    'chance',
    'planetModel'
  ],
  function($, Chance, PlanetModel) {

  var SolrSystemModel = function(options) {
    this.planets = [];
    this.chance = new Chance();
    this.init = function() {

      var planetCount = this.planets.length;
      var goodScore = 0;
      var evilScore = 0;
      for (var i = 0; i < planetCount; i++) {
        if (this.planets[i].moralStanding == 'GOOD') {
          goodScore ++;
        } else {
          evilScore ++;
        }
      }
      this.moralStanding = (evilScore > goodScore) ? 'EVIL' : 'GOOD';

      this.position = { 'x': this.chance.floating({min: 0, max: 1}), 'y': this.chance.floating({min: 0, max: 1})}
    };

    this.load = function(solrSystemData) {
      var min = solrSystemData['planets']['min'];
      var max = solrSystemData['planets']['max'];
      var count = min === max ? min : chance.natural({'min': min, 'max': max});

      for (var i = 0; i < count; i++) {
        var planet = new PlanetModel();
        planet.load(solrSystemData['planets']['collectionType']['planetModel']);
        this.planets.push(planet);
      }

      this.position = { 'x': this.chance.floating({min: 0, max: 1}), 'y': this.chance.floating({min: 0, max: 1}) };
      this.size = this.chance.floating({min: 0, max: 1});
    }

  };

  return SolrSystemModel;
});
