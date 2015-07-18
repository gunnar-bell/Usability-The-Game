define(
	[
    'jquery',
    'chance',
    'multiverseModel',
		'universeModel',
		'solrSystemModel',
		'playerModel'
	],
	function($, Chance, MultiverseModel, UniverseModel, SolrSystemModel, PlayerModel) {
	var GameModel = function(options) {

    this.name = '';
    this.multiverse = null;
    this.player = null;

		this.init = function() {
			// set up the state and all event listeners
			this.player = new PlayerModel();
			this.chance = new Chance();
      this.buildMap();
		};

		this.buildMap = function() {
      gameModel = this;
      $.ajax({
        url: 'data/game.json',
        dataType: 'json',
        async: false,
        success: function(json) {
          // Generate
          var game = json['game'];
          this.name = game['name'];
          var multiverse = game['multiverse'];
          gameModel.multiverse = new MultiverseModel();
          gameModel.multiverse.load(multiverse);
        }
      });
      // $.getJSON("data/game.json", function(json) {
      //     console.log(json); // this will show the info it in firebug console

      //     // Generate
      //     var game = json['game'];
      //     this.name = game['name'];
      //     var multiverse = game['multiverse'];
      //     gameModel.multiverse = new MultiverseModel();
      //     gameModel.multiverse.load(multiverse);

      //     ////var universes = gameModel.buildCollectionElement(multiverse);////['universes']);
      //     //console.log(universes);
      // });

      // let's give the player a starting point
      var galaxy = this.getCurrentGalaxy();
      this.player.moveTo(galaxy.solrSystems[0]);
		};

    this.buildCollectionElement = function(element) {
      if (element['type'] == 'collection') {
        var collectionTypeName = element['collectionTypeName'];
        var childElementDefinition = element['collectionType'][collectionTypeName];
        var min = element['min'];
        var max = element['max'];
        var count = 0;
        if (min <= max) {
          count = min;
        } else {
          count = this.chance.natural({'min': min, 'max': max});
        }

        var collection = [];
        for (var i = 0; i < count; i++) {
          var childElement = new (require(collectionTypeName))();
          collection.push(childElement);
        }
        return collection;

      } else if (element['type'] == 'object') {
        for (elementKey in element) {
          if (elementKey != 'type' && element.hasOwnProperty(elementKey)) {
            this[elementKey] = this.buildCollectionElement(element[elementKey]);
          }
        }
      }
      
    };

    this.getCurrentGalaxy = function() {
      return this.multiverse.universes[0].galaxies[0];
    }
	}

  return GameModel;
});
