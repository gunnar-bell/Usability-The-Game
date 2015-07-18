define(
  [
    'jquery',
    'chance',
    'missionModel'
  ], function($, Chance, MissionModel) {
  var PlanetModel = function() {
    this.chance = new Chance();
    this.name = this.chance.last() + this.chance.character() + this.chance.natural({min: 100, max: 999});

    this.init = function() {
      this.moralStanding = 'GOOD|EVIL';
      this.location = {x: 'a number', y: 'a number'};
      this.strength = this.chance.natural({min: 5, max: 30});
    }
    this.getLocation = function() {
    	return this.location;
    }
    this.missions = [];

    this.player = 'x';

    this.load = function(planetData) {
      this.position = { 'x': this.chance.floating({min: 0, max: 1}), 'y': this.chance.floating({min: 0, max: 1})};

      var min = planetData['missions']['min'];
      var max = planetData['missions']['max'];
      var count = min === max ? min : chance.natural({'min': min, 'max': max});

      for (var i = 0; i < count; i++) {
        var mission = new MissionModel();
        mission.load(planetData['missions']['collectionType']['missionModel']);
        this.missions.push(mission);
      }
    }
	}

  return PlanetModel;
});
