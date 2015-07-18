define(
  [
    'jquery',
    'chance',
    'solrSystemModel',
    'playerModel'
  ],
  function($, Chance, SolrSystemModel, PlayerModel) {
  var GalaxyView = function(canvas) {

    this.stage = new createjs.Stage('canvas');
    this.stage.enableMouseOver(10);

    this.canvas = canvas;

    this.details = new createjs.Container();
    var rect = new createjs.Shape();
    var rectWidth = 200;
    var rectHeight = 100;
    rect.graphics.beginFill('#6e7e8e').drawRect(0, 0, rectWidth, rectHeight);
    rect.x = 50;
    rect.y = 50;
    this.details.addChild(rect);

    this.text = new createjs.Text();
    this.text.set({
        text: ' '
    });
    var b = this.text.getBounds();
    this.text.x = rect.x + (10 - b.width ) / 2; 
    this.text.y = rect.y + (rectHeight - 50 - b.height ) / 2;
    
    //this.details.addChild(bitmapInstance, shapeInstance);
    //this.details.x = 100;

    this.render = function(gameModel) {
      // var context = this.canvas.getContext('2d');
      // var canvasLeft = this.canvas.offsetLeft;
      // var canvasTop = this.canvas.offsetTop;

      // var background = new Image();
      // background.src = "https://newevolutiondesigns.com/images/freebies/space-wallpaper-11.jpg";

      // canvas = this.canvas;
      // var elements = [];

      // background.onload = function(){
      //   context.drawImage(background,0,0);
      // }

      var galaxyModel = gameModel.getCurrentGalaxy();
      var view = this;

      // iterate over each solr system and plot elements on the canvas
      for (var i = 0; i < galaxyModel.solrSystems.length; i++) {
        var solrSystem = galaxyModel.solrSystems[i];
        var x = canvas.width * solrSystem.position.x;
        var y = canvas.height * solrSystem.position.y;
        var size = 6 + solrSystem.size * 3;

        // context.beginPath();
        // context.arc(x, y, size, 0, 2 * Math.PI, false);
        // context.fillStyle = 'yellow';
        // context.fill();
        // context.lineWidth = 1;
        // context.strokeStyle = '#003300';
        // context.stroke();

        var circle = new createjs.Shape();
        circle.graphics.beginFill('yellow').drawCircle(x, y, size);
        // circle.x = 100;
        // circle.y = 100;
        circle.index = i;

        circle.on("click", function() {
          //console.log(galaxyModel.solrSystems[this.index]);
          view.askToConfirmTravel(galaxyModel.solrSystems[this.index]);
        });

        circle.on("mouseover", function() {
          view.displayDetails(galaxyModel.solrSystems[this.index]);
        });

        circle.on("mouseout", function() {
          view.hideDetails();
        });

        this.stage.addChild(circle);
      }

      this.stage.update();
    }

    this.askToConfirmTravel = function(solrSystem) {
      // highlight the solr system in some way and ask for confirmation
      var fuelUsage = gameModel.player.calculateFuelUsage(solrSystem);
      console.log('Confirm Travel for ' + fuelUsage + ' gallons of fuel?');
    };

    this.confirmTravel = function(solrSystem) {
      // ENGAGE!
      // TODO: run transport animation here
      gameModel.player.moveTo(solrSystem);
    };

    this.displayDetails = function(solrSystem) {
      var textToDisplay = 'SOLR System: ' + solrSystem.name + '\n';
      for (var i = 0; i < solrSystem.opportunities.length; i++) {
        textToDisplay += '\n' + solrSystem.opportunities[i];
      }

      this.details.removeChild(this.text);
      this.text.set({
          text: textToDisplay
      });
      this.details.addChild(this.text);
      this.stage.addChild(this.details);
      this.stage.update();
    }

    this.hideDetails = function() {
      this.stage.removeChild(this.details);
      this.stage.update();
    }
  }

  return GalaxyView;
});