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

      this.init = function() {
        var c = $('#canvas');
        var container = $(c).parent();
        // resize canvas to fit its parent
        c.attr('width', $(container).width() );
        c.attr('height', $(container).height() );
      };
    };

    return GameView;
  });