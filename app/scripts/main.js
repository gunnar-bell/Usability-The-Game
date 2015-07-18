/*global require*/
'use strict';

require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        gameModel: 'models/game-model',
        playerModel: 'models/player-model',
        universeModel: 'models/universe-model',
        solrSystemModel: 'models/solr-system-model',
        planetModel: 'models/planet-model',
        spaceshipModel: 'models/spaceship-model',
        missionModel: 'models/mission-model.js'
    }
});

require([
    'gameModel',
    'universeModel'
], function (GameModel) {
    var g = new GameModel();
    g.init();
});
