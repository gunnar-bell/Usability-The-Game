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
        universeModel: 'models/universe-model'
    }
});

require([
    'gameModel',
    'universeModel'
], function (GameModel) {
    var g = new GameModel();
    g.init();
});
