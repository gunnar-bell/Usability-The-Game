define(
  [
    'jquery',
    'chance',
    'solrSystemModel',
    'playerModel'
  ],
  function($, Chance, SolrSystemModel, PlayerModel) {
	var GalaxyModel = function(options) {
		this.solrSystems = [];
		this.others = ['a black hole?'];
		this.moralStanding = 'GOOD|EVIL';

    this.load = function(galaxyData) {
      var min = galaxyData['solrSystems']['min'];
      var max = galaxyData['solrSystems']['max'];
      var count = min === max ? min : chance.natural({'min': min, 'max': max});

      for (var i = 0; i < count; i++) {
        var solrSystem = new SolrSystemModel();
        solrSystem.load(galaxyData['solrSystems']['collectionType']['solrSystemModel']);
        this.solrSystems.push(solrSystem);
      }
    }
	}

  return GalaxyModel;
});