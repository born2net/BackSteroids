/**
 Setup globals per App view
 @class Setup
 @constructor
 @return {Object} instantiated Setup
 **/
define(['underscore', 'jquery', 'backbone', 'backbone.controller', 'ComBroker', 'Lib'], function (_, $, Backbone, backbonecontroller, ComBroker, Lib) {

    window.BB = Backbone;
    window.lang = 'en';
    window.debug = 1;
    BB.globs = {};
    BB.SERVICES = {};
    BB.EVENTS = {};
    BB.LOADING = {};
    BB.CONSTS = {};
    BB.lib = new Lib();
    window.log = BB.lib.log;
    window.jlog = BB.lib.jlog;
    BB.lib.addBackboneOptions();
    BB.lib.addBackboneCollectionSave();
    BB.comBroker = new ComBroker();

    $.ajaxSetup({cache: false});
    $.ajaxSetup({
        headers: {'Authorization': 'somePasswordHere'}
    });
});


