define(
  [
    'jquery',
    'chance',
    'galaxyModel',
    'solrSystemModel',
    'playerModel'
  ],
  function($, Chance, GalaxyModel, SolrSystemModel, PlayerModel) {
  var UniverseModel = function(options) {
    this.galaxies = [];

    this.load = function(universeData) {
      var min = universeData['galaxies']['min'];
      var max = universeData['galaxies']['max'];
      var count = min === max ? min : chance.natural({'min': min, 'max': max});

      for (var i = 0; i < count; i++) {
        var galaxy = new GalaxyModel();
        galaxy.load(universeData['galaxies']['collectionType']['galaxyModel']);
        this.galaxies.push(galaxy);
      }
    }
	}

  return UniverseModel;
});
