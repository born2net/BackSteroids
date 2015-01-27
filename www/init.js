/**
 Require js initialization module definition file
 @class Require init js
 **/
require.config({
    waitSeconds: 25,
    baseUrl: '/js',
    paths: {
        'jquery': 'common/jq/jq1.9.1',
        'backbone': 'common/backbone/backbone',
        'text': 'common/requirejs/text',
        'underscore': 'common/underscore/underscore',
        'backbone.controller': 'common/backbone-controller/backbone.controller',
        'backbone.localstorage': 'common/backbone-localstorage/backbone.dualstorage.amd',
        'backbone.stickit': 'common/backbone-stickit/backbone.stickit',
        'TimelineMax': 'common/gsap/TimelineMax',
        'TweenMax': 'common/gsap/TweenMax',
        'TweenLite': 'common/gsap/TweenLite',
        'CSSPlugin': 'common/gsap/plugins/CSSPlugin',
        'localizer': 'common/localizer/dist/jquery.localize',
        'RC4': 'common/rc4/RC4',
        'Lib': 'common/libs/Lib',
        'ComBroker': 'common/comBroker/ComBroker',
        'Elems': 'elements/Elems',
        'CoolAnimElems': 'elements/CoolAnimElems',
        'CommPageElems': 'elements/CommPageElems',
        'DrawerElems': 'elements/DrawerElems',
        'SettingsElems': 'elements/SettingsElems',
        'NoteModel' : 'models/NoteModel',
        'LocalCollection': 'collections/LocalCollection',
        'AuthCollection': 'collections/AuthCollection',
        'Setup': 'setup',
        'LanguageSelectorView': 'views/LanguageSelectorView',
        'CoolAnimView': 'views/CoolAnimView',
        'CommPageView': 'views/CommPageView',
        'PageView': 'views/PageView',
        'StackView': 'common/stackview/StackView'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.controller': {
            deps: ['underscore', 'jquery']
        },
        'underscore': {
            exports: '_'
        },
        'ComBroker': {
            deps: ['backbone', 'jquery']
        },
        'RC4': {
            exports: 'RC4'
        },
        'TweenMax': {
            exports: 'TweenMax'
        },
        'TweenLite': {
            exports: 'TweenLite'
        },
        'TimelineMax': {
            dep: ['TweenLite'],
            exports: 'TimelineMax'
        },
        'CSSPlugin': {
            dep: ['TweenLite'],
            exports: 'CSSPlugin'
        },
    }
});

// Kick off application per loader domain set in HTML page
require([window.webViewer], function (WebViewer) {
    new WebViewer();
});