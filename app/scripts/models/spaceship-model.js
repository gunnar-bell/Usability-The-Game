define([], function() {
  var SpaceshipModel = function() {
    this.fuel = 40000; // between 0 and 1
    this.health = 1;
    
    // todo adjust this for the new fuel
    this.refuel = function() {
      while (this.fuel < 1) {
        setInterval(function(){
          this.fuel += 0.05;
        }, 250);
        console.log('Fuel level: ' + this.fuel.toString());
      }
    };
  };

  return SpaceshipModel;
});
