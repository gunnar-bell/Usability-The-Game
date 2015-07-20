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
    this.gameContainer = this.galaxyView.gameContainer;

    this.canvas = canvas;


    this.render = function(gameModel) {
      // TODO: we should probably check to see if we have already rendered things.
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
        circle.graphics.setStrokeStyle(1).beginStroke('black').beginRadialGradientFill(["#0F0","#00F"], [0, 1], 0, 0, size / 1.7, 0, 0, size).drawCircle(0, 0, size);
        circle.x = x;
        circle.y = y;
        circle.index = i;

        this.gameContainer.addChild(circle);
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