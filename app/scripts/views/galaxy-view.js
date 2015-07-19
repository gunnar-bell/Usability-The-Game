define(
  [
    'jquery',
    'chance',
    'solrSystemModel',
    'playerModel',
    'localView'
  ],
  function($, Chance, SolrSystemModel, PlayerModel, LocalView) {
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
      var view = this;

      canvas.addEventListener("mousewheel", MouseWheelHandler, false);
      canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);

      var animations = [];

      var zoom;
      this.localView = new LocalView(this);

      function MouseWheelHandler(e) {
        view.zoom(e);
      }

      this.zoom = function(e) {
        var zoomLevel;
        if(Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))>0)
          zoomLevel = 1.1;
        else
          zoomLevel = 1/1.1;

        mousePosition = view.createPosition(view.stage.mouseX, view.stage.mouseY);
        console.log(mousePosition);
        view.zoomOnPosition(mousePosition, zoomLevel, true);
        // var local = view.stage.globalToLocal(view.stage.mouseX, view.stage.mouseY);
        // view.stage.regX = local.x;
        // view.stage.regY = local.y;
        // view.stage.x = view.stage.mouseX;
        // view.stage.y = view.stage.mouseY; 
        // view.stage.scaleX = view.stage.scaleY *= zoomLevel;

        view.stage.update();
      }

      this.stage.addEventListener("stagemousedown", function(e) {
        var offset = { x: view.stage.x - e.stageX, y: view.stage.y - e.stageY };
        view.stage.addEventListener("stagemousemove",function(ev) {
          view.stage.x = ev.stageX+offset.x;
          view.stage.y = ev.stageY+offset.y;
          view.stage.update();
        });
        view.stage.addEventListener("stagemouseup", function(){
          view.stage.removeAllEventListeners("stagemousemove");
        });
      });

      this.createPosition = function(x, y) {
        return {x: x, y: y};
      }

      this.setZoom = function(solrSystem, zoomLevel) {
        positionOnCanvas = this.createPosition(solrSystem.position.x * canvas.width, solrSystem.position.y * canvas.height);
        this.zoomOnPosition(positionOnCanvas, zoomLevel, false);
      }

      // Take a lot of these helper things and throw them in their own helper util or something
      this.zoomOnPosition = function(position, zoomLevel, relativeZoom) {
        // This works well scaleX/Y is 1 but gets messed up when already zoomed.
        var x = position.x;
        var y = position.y;
        var local = view.stage.globalToLocal(x, y);
        // console.log(local);
        // console.log(x + ' , ' + y);
        view.stage.regX = local.x;
        view.stage.regY = local.y;
        view.stage.x = x;
        view.stage.y = y;
        if (relativeZoom) {
          view.stage.scaleX = view.stage.scaleY *= zoomLevel;
        } else {
          view.stage.scaleX = view.stage.scaleY = zoomLevel;
        }
        view.stage.update();
      }

      this.render = function(gameModel) {
        var galaxyModel = gameModel.getCurrentGalaxy();
        var view = this;

        createjs.Ticker.setInterval(25);
        createjs.Ticker.addEventListener("tick", this.tick);

        // iterate over each solr system and plot elements on the canvas
        for (var i = 0; i < galaxyModel.solrSystems.length; i++) {
          var solrSystem = galaxyModel.solrSystems[i];
          var x = canvas.width * solrSystem.position.x;
          var y = canvas.height * solrSystem.position.y;
          var size = 8 + solrSystem.size * 6; // this should probably factor in the size of the window?

          var circle = new createjs.Shape();
          circle.graphics.beginRadialGradientFill(['orange','yellow'], [0, 1], 0, 0, size / 3, 0, 0, size).drawCircle(0, 0, size);
          circle.x = x;
          circle.y = y;
          circle.index = i;

          circle.on("click", function(event) {
            view.askToConfirmTravel(this, galaxyModel.solrSystems[this.index]);
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
        this.playerSprite.graphics.setStrokeStyle(1).beginStroke('black').beginFill('red').drawCircle(0, 0, 4);
        this.updatePlayerLocation();
        this.stage.addChild(this.playerSprite);
        this.stage.update();
      };

      this.updatePlayerLocation = function() {
        // Place the player slightly above to the left of the planet they are on
        this.playerSprite.x = canvas.width * gameModel.player.currentLocation.position.x - 5;
        this.playerSprite.y = canvas.height * gameModel.player.currentLocation.position.y; - 5
      };

      this.askToConfirmTravel = function(solrSystemViewElement, solrSystemModel) {
        // highlight the solr system in some way and ask for confirmation
        var fuelUsage = gameModel.player.calculateFuelUsage(solrSystemModel);
        var doTravel = true;//// confirm('Confirm Travel for ' + fuelUsage.toFixed(1) + ' gallons of fuel?');
        if (doTravel) {
          this.confirmTravel(solrSystemViewElement, solrSystemModel);
        }
      };

      this.confirmTravel = function(solrSystemViewElement, solrSystemModel) {
        // ENGAGE!
        //this.setZoom(solrSystemModel, 6);

        var convertedPosition = this.convertRelativeToCanvasPosition(solrSystemModel.position);
        convertedPosition = {x: convertedPosition.x - 5, y: convertedPosition.y - 5};
        // { x: this.stage.scaleX, y: this.stage.scaleY } - they are always 1:1
        animations.push({type: 'zoom', originalZoom: this.stage.scaleX, finalZoom: 6, destination: convertedPosition, speed: 4});

        gameModel.player.moveTo(solrSystemModel);
        //this.updatePlayerLocation();

        source = { x: this.playerSprite.x, y: this.playerSprite.y};
        animations.push({obj: this.playerSprite, source: source, model: gameModel.playerModel, type: 'move', destination: convertedPosition, speed: 5});

        // Let's tell the local view to render solar system stuff like planets
        this.localView.render(gameModel);
      };

      this.convertRelativeToCanvasPosition = function(position) {
        return {x: position.x * this.canvas.width, y: position.y * this.canvas.height};
      }

      this.tick = function() {
        var animationsCompleted = [];
        for (var i = 0; i < animations.length; i++) {
          var animation = animations[i];
          if (animation.type == 'move') {
            var objPosition = {x: animation.obj.x, y: animation.obj.y};

            // Which direction? left or right?
            if (objPosition.x < animation.destination.x) {
              // Travel the lesser between the speed and the
              animation.obj.x += (animation.destination.x - objPosition.x < animation.speed) ? animation.destination.x - objPosition.x : animation.speed;
            } else if (objPosition.x > animation.destination.x) {
              animation.obj.x -= (objPosition.x - animation.destination.x < animation.speed) ? objPosition.x - animation.destination.x : animation.speed;
            }

            // Which direction? up or down?
            if (objPosition.y < animation.destination.y) {
              animation.obj.y += (animation.destination.y - objPosition.y < animation.speed) ? animation.destination.y - objPosition.y : animation.speed;
            } else if (objPosition.y > animation.destination.y) {
              animation.obj.y -= (objPosition.y - animation.destination.y < animation.speed) ? objPosition.y - animation.destination.y : animation.speed;
            }

            // mark this animation as having been completed.
            if (view.arePointsEqual(objPosition, animation.destination)) {
              animationsCompleted.push(i);
            }
          } else if (animation.type == 'zoom') {
            // Which direction? in or out?
            var speed = animation.speed > 0.0001 ? animation.speed : 0.0001
            if ( view.stage.scaleX < animation.finalZoom) {
              zoomingIn = true;
              zoomLevel = 1 + speed * 0.01;
            } else {
              zoomingIn = false;
              zoomLevel = 1 - speed * 0.01;
            }

            // relative zoom on this position
            view.zoomOnPosition(animation.destination, zoomLevel, true)

            // mark this animation as having been completed.
            if ((zoomingIn && view.stage.scaleX >= animation.finalZoom) || (!zoomingIn && view.stage.scaleX <= animation.finalZoom)) {
              animationsCompleted.push(i);
            }
          }
        }

        // Clean out completed animations.
        animationsCompleted.reverse();
        for (var completed in animationsCompleted) {
          animations.splice(animationsCompleted[completed], 1);
        }

        view.stage.update();
      };

      this.arePointsEqual = function(position1, position2) {
        return position1.x === position2.x && position1.y === position2.y;
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

        var coordinates = this.convertRelativeToCanvasPosition(solrSystem.position);
        textToDisplay += '\n\nCoordinates: ' + coordinates.x.toFixed(2) + ' , ' + coordinates.y.toFixed(2);

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