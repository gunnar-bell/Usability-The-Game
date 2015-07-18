define([], function() {
  var SpaceshipModel = function() {
    this.fuel = 40000; 
    this.health = 1;
    
    this.refuel = function() {
      while (this.fuel < 40000) {
        setInterval(function(){
          this.fuel += 5000;
        }, 250);
        console.log('Fuel level: ' + this.fuel.toString());
      }
    };
  };

  return SpaceshipModel;
});
