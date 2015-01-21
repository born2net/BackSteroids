/**
 Settings Backbone > View
 @class DrawerElems
 @constructor
 @return {Object} instantiated FQCreatorView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var DrawerElems = Backbone.View.extend({

        initialize: function () {
            // elements
            this.PASS1 = '#pass1';
            this.PASS2 = '#pass2';
            this.DRAWER_CLOSE = '#drawerClose';

            // templates

            // classes
        }
    });

    return DrawerElems;
});


