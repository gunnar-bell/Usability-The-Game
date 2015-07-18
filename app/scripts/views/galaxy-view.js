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
      this.rect = new createjs.Shape();
      var rectWidth = 200;
      var rectHeight = 100;
      this.rect.graphics.beginFill('#6e7e8e').drawRect(0, 0, rectWidth, rectHeight);

      this.text = new createjs.Text();
      this.text.set({
          text: ' '
      });

      this.playerSprite = new createjs.Shape();

      this.render = function(gameModel) {
        var galaxyModel = gameModel.getCurrentGalaxy();
        var view = this;

        // iterate over each solr system and plot elements on the canvas
        for (var i = 0; i < galaxyModel.solrSystems.length; i++) {
          var solrSystem = galaxyModel.solrSystems[i];
          var x = canvas.width * solrSystem.position.x;
          var y = canvas.height * solrSystem.position.y;
          var size = 6 + solrSystem.size * 3;

          var circle = new createjs.Shape();
          circle.graphics.beginFill('yellow').drawCircle(x, y, size);
          circle.index = i;

          circle.on("click", function(event) {
            view.askToConfirmTravel(galaxyModel.solrSystems[this.index]);
          });

          circle.on("mouseover", function(event) {
            view.displayDetails(event, galaxyModel.solrSystems[this.index]);
          });

          circle.on("mouseout", function() {
            view.hideDetails();
          });

          this.stage.addChild(circle);
        }

        // And place the player as well
        var playerX = canvas.width * gameModel.player.position.x;
        var playerY = canvas.height * gameModel.player.position.y;
        this.playerSprite.graphics.beginFill('red').drawCircle(playerX, playerY, 2);
        this.stage.addChild(this.playerSprite);
        this.stage.update();
      };

      this.updatePlayerLocation = function() {
        // And place the player as well
        this.stage.removeChild(this.playerSprite);
        var playerX = canvas.width * gameModel.player.position.x;
        var playerY = canvas.height * gameModel.player.position.y;
        this.playerSprite = new createjs.Shape();
        this.playerSprite.graphics.beginFill('red').drawCircle(playerX, playerY, 2);
        this.stage.addChild(this.playerSprite);
      };

      this.askToConfirmTravel = function(solrSystem) {
        // highlight the solr system in some way and ask for confirmation
        var fuelUsage = gameModel.player.calculateFuelUsage(solrSystem);
        var doTravel = confirm('Confirm Travel for ' + fuelUsage.toFixed(1) + ' gallons of fuel?');
        if (doTravel) {
          this.confirmTravel(solrSystem);
        }
      };

      this.confirmTravel = function(solrSystem) {
        // ENGAGE!
        // TODO: run transport animation here
        gameModel.player.moveTo(solrSystem);
        this.updatePlayerLocation();
      };

      this.displayDetails = function(event, solrSystem) {
        // If near the right edge, move the hover element to the left of the mouse
        if (event.stageX > canvas.width - 200) {
          this.rect.x = event.stageX - 220;
        } else {
          this.rect.x = event.stageX + 20;
        }

        // If near the bottom edge, move the hover element to the top of the mouse
        if (event.stageY > canvas.height - 100) {
          this.rect.y = event.stageY - 100;
        } else {
          this.rect.y = event.stageY;
        }

        this.details.addChild(this.rect);

        var textToDisplay = 'SOLR System: ' + solrSystem.name + '\n';
        for (var i = 0; i < solrSystem.opportunities.length; i++) {
          textToDisplay += '\n' + solrSystem.opportunities[i];
        }

        this.details.removeChild(this.text);
        this.text.set({
            text: textToDisplay
        });
        var b = this.text.getBounds();
        this.text.x = this.rect.x + (b.width - 100) / 2;
        this.text.y = this.rect.y + (rectHeight - 30 - b.height ) / 2;
        this.details.addChild(this.text);
        this.stage.addChild(this.details);
        this.stage.update();
      };

      this.hideDetails = function() {
        this.stage.removeChild(this.details);
        this.stage.update();
      };
    };

    return GalaxyView;
  });