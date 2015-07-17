/*global require*/
'use strict';

require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        game: 'models/game-model'
    }
});

require([
    'backbone',
    'game'
], function (Backbone, game) {
    Backbone.history.start();
    var g = new game();
});
