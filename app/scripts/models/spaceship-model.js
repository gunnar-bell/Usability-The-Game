define([], function() {
  var SpaceshipModel = function(options) {
    this.init = function() {
      this.fuel = 1; // between 0 and 1
      this.health = 1;
    };

    this.refuel = function() {
      while (this.fuel < 1) {
        setInterval(function(){
          this.fuel += 0.05;
        }, 250);
      }
    };
  };

  return SpaceshipModel;
});
