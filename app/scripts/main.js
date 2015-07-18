/*global require*/
'use strict';

require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        chance: '../bower_components/chance/chance',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        gameModel: 'models/game-model',
        playerModel: 'models/player-model',
        multiverseModel: 'models/multiverse-model',
        universeModel: 'models/universe-model',
        galaxyModel: 'models/galaxy-model',
        solrSystemModel: 'models/solr-system-model',
        planetModel: 'models/planet-model',
        spaceshipModel: 'models/spaceship-model',
        missionModel: 'models/mission-model.js',
        gameView: 'views/game-view',
        galaxyView: 'views/galaxy-view'
    }
});

require([
    'gameModel',
    'gameView'
], function (GameModel, GameView) {
    var g = new GameModel();
    g.init();
    var v = new GameView();
    v.render(g);
});
