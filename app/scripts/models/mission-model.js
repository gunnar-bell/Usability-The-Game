define(
  [
    'chance'
  ], function(Chance) {
  var MissionModel = function(options) {
    this.chance = new Chance();
    this.active = false;

    this.load = function(missionData) {
      var missionTypes = missionData['missionTypes'];
      this.missionType = this.chance.natural({min: 0, max: missionTypes.length - 1});

      this.missionElements = missionTypes[this.missionType];
    };

    this.activate = function(solrSystem) {
      this.active = true;
    };

    this.requiresTravel = function() {
      if (this.missionElements.requiresTravel) {
        return true;
      } else {
        return false;
      }
    };

    this.setDestination = function(solrSystem) {
      this.destination = solrSystem;
    }
  };

  return MissionModel;
});
