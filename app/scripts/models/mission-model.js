define(
  [
    'chance'
  ], function(Chance) {
  var MissionModel = function(options) {
    this.chance = new Chance();

    this.load = function(missionData) {
      var missionTypes = missionData['missionTypes'];
      this.missionType = this.chance.natural({min: 0, max: missionTypes.length - 1});

      this.missionElements = missionTypes[this.missionType];
    };
  };

  return MissionModel;
});
