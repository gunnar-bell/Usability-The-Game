define(
  [
    'jquery',
    'chance',
    'galaxyView'
  ],
  function($, Chance, GalaxyView) {
    var GameView = function() {

      this.galaxyView = null;
      this.activeView = null;

      this.render = function(gameModel) {
        this.canvas = $('#canvas').get(0);

        this.galaxyView = new GalaxyView(this.canvas);
        this.galaxyView.render(gameModel);
        this.activeView = this.galaxyView;
      };
    };

    return GameView;
  });