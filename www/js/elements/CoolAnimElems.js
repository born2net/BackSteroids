/**
 CoolAnimElems Backbone > View
 @class CoolAnimElems elements
 @constructor
 @return {Object} instantiated CoolAnimElems
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var CoolAnimElems = Backbone.View.extend({

        initialize: function () {

            // elements
            this.LIKE = '#like';
            this.LINE_NAME = '#lineName';
            this.USER_NAME = '#userName';
            this.NEXT_FADE = '#nextFade';
            this.PREV_FADE = '#prevFade';
            this.NEXT_SLIDE = '#next';
            this.PREV_SLIDE = '#prev';

            // templates

            // classes


        }
    });

    return CoolAnimElems;
});


