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
	    this.position = {
	      'x': chance.floating({'min': 0, 'max': 1}),
	      'y': chance.floating({'min': 0, 'max': 1})
	    }

    this.load = function(galaxyData) {
      var min = galaxyData['solrSystems']['min'];
      var max = galaxyData['solrSystems']['max'];
      var count = min === max ? min : chance.natural({'min': min, 'max': max});

      for (var i = 0; i < count; i++) {
        var solrSystem = new SolrSystemModel();
        solrSystem.load(galaxyData['solrSystems']['collectionType']['solrSystemModel']);
        this.solrSystems.push(solrSystem);
      }

      // Now that we've built out the solr systems, planets, and missions. We need to look at the missions and prepare goals where necessary
      for (var i = 0; i < this.solrSystems.length; i++) {
        for(var j = 0; j < this.solrSystems[i].planets.length; j++) {
          for(var k = 0; k < this.solrSystems[i].planets[j].missions.length; k++) {
            var mission = this.solrSystems[i].planets[j].missions[k];
            if (mission.requiresTravel()) {
              // Requires travel, so set a destination now. Really just pick another solr system besides index i. So why not i - 1. Or +1 if zero
              var destinationIndex = i - 1;
              if (i === 0) {
                destinationIndex = i + 1;
              }
              mission.setDestination(this.solrSystems[destinationIndex]);
            }
          }
        }
      }
    };
	}

  return GalaxyModel;
});