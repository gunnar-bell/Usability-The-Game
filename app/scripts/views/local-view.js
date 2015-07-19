define(
  [
    'jquery',
    'chance',
    'solrSystemModel',
    'playerModel'
  ],
  function($, Chance, SolrSystemModel, PlayerModel) {
  var LocalView = function(galaxyView) {

    this.galaxyView = galaxyView;
    var canvas = galaxyView.canvas;
    this.stage = this.galaxyView.stage;
    this.stage.enableMouseOver(10);

    this.canvas = canvas;


    this.render = function(gameModel) {
      var galaxyModel = gameModel.getCurrentGalaxy();
      var view = this;
      var player = gameModel.player;
      var solrSystem = player.currentLocation;
      for (var i = 0; i < solrSystem.planets.length; i++) {
        var planet = solrSystem.planets[i];
        var x = canvas.width * solrSystem.position.x + (planet.position.x * 50 - 25);
        var y = canvas.height * solrSystem.position.y + (planet.position.y * 50 - 25);
        var size = 1 + planet.strength / 4;

        var circle = new createjs.Shape();
        circle.graphics.beginFill('green').drawCircle(x, y, size);
        circle.index = i;

        this.stage.addChild(circle);
      }

      this.stage.update();
    }

    this.returnToGalaxyView = function() {
      if (this.galaxyView) {
        this.transition();
        this.galaxyView.render();
      }
    }

    this.transition = function() {
      
    }
  }

  return LocalView;
});