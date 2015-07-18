define(
  [
    'jquery',
    'chance',
    'universeModel',
    'solrSystemModel',
    'playerModel'
  ],
  function($, Chance, UniverseModel, SolrSystemModel, PlayerModel) {
	var MultiverseModel = function(options) {
		this.universes = [];
    this.chance = new Chance();

    this.load = function(multiverseData) {
      var min = multiverseData['universes']['min'];
      var max = multiverseData['universes']['max'];
      var count = min === max ? min : chance.natural({'min': min, 'max': max});

      for (var i = 0; i < count; i++) {
        var universe = new UniverseModel();
        universe.load(multiverseData['universes']['collectionType']['universeModel']);
        this.universes.push(universe);
      }
    }
	}

	return MultiverseModel;
});
