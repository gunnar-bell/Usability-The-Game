define(
  [
    'jquery',
    'chance',
    'planetModel',
    'storeModel'
  ],
  function($, Chance, PlanetModel, StoreModel) {

  var SolrSystemModel = function(options) {
    this.planets = [];
    this.opportunities = [];
    this.chance = new Chance();
    this.stores = [];
    this.strength = 5;
  
    var opportunityTypes = {
      'fuel': {
        'display': 'Fuel Up!',
        'chance': 0.9
      },
      'food': {
        'display': 'Get Groceries!',
        'chance': 0.8
      },
      'weapons': {
        'display': 'Marshmallows Sold Here!',
        'chance': 0.3
      },
      'repairs': {
        'display': 'Fix You Right Up!',
        'chance': 0.6
      }
    }

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
        this.strength += this.planets[i].strength;
      }
      this.moralStanding = (evilScore > goodScore) ? 'EVIL' : 'GOOD';

      ///this.position = { 'x': this.chance.floating({min: 0, max: 1}), 'y': this.chance.floating({min: 0, max: 1})};
      this.name = this.chance.last() + this.chance.character({alpha: true, casing: 'upper'}) + this.chance.natural({min: 100, max: 999});
    };

    this.load = function(solrSystemData) {
      this.init();
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

      for (var key in opportunityTypes) {
        if (opportunityTypes.hasOwnProperty(key) && this.chance.floating({min: 0, max: 1}) >= (1 - opportunityTypes[key].chance)) {
          this.opportunities.push(opportunityTypes[key].display);
          store = new StoreModel(key);
          store.init(this.strength);
          this.stores[key] = store;
        }
      }
    }

  };

  return SolrSystemModel;
});
