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

        //this.canvas.on( "click", this.handleClick);
        //this.canvas.addEventListener('click', this.handleClick);

        // this.height = this.canvas.height;
        // this.width = this.canvas.width;
        //console.log(gameModel);

        this.galaxyView = new GalaxyView(this.canvas);
        this.galaxyView.render(gameModel);
        this.activeView = this.galaxyView;
      };

      this.handleClick = function(event) {
        //debugger;
        //this.activeView.handleClick(event);
        
      };
    };

    return GameView;
  });