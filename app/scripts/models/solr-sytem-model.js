define(['planetModel'], function() {
  var SolrSystemModel = function(options) {
    this.init = function() {
      this.planets = ['1', '2', '3'];
      var planetCount = this.planets.length;
      var goodScore = 0;
      var evilScore = 0;
      for (var i = 0; i < planetCount; i++) {
        if (this.planets[i].moralStanding == 'GOOD') {
          goodScore ++;
        } else {
          evilScore ++;
        }
      }
      this.moralStanding = (evilScore > goodScore) ? 'EVIL' : 'GOOD';
    };

  };

  return SolrSystemModel;
});
