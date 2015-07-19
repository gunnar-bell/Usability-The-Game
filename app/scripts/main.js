/*global require*/
'use strict';

require.config({
    shim: {
    },
    paths: {
        backbone: '../bower_components/backbone/backbone',
        chance: '../bower_components/chance/chance',
        galaxyModel: 'models/galaxy-model',
        galaxyView: 'views/galaxy-view',
        gameModel: 'models/game-model',
        gameView: 'views/game-view',
        jquery: '../bower_components/jquery/dist/jquery',
        localView: 'views/local-view',
        missionModel: 'models/mission-model',
        multiverseModel: 'models/multiverse-model',
        planetModel: 'models/planet-model',
        playerModel: 'models/player-model',
        progress: '../bower_components/progressbar/dist/progressbar',
        solrSystemModel: 'models/solr-system-model',
        spaceshipModel: 'models/spaceship-model',
        storeModel: 'models/store-model',
        underscore: '../bower_components/lodash/dist/lodash',
        universeModel: 'models/universe-model'
    }
});

require([
    'gameModel',
    'gameView',
	'playerModel'    
], function (GameModel, GameView, PlayerModel) {
    var g = new GameModel();
    g.init();
    var v = new GameView();
    v.init();
    v.render(g);
});
