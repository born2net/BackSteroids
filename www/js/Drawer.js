/**
 Settings Backbone > View
 @class Drawer
 @constructor
 @return {Object} instantiated FQCreatorView
 **/
define(['jquery', 'backbone', 'PageView', 'Setup', 'DrawerElems', 'backbone.stickit'], function ($, Backbone, PageView, Setup, DrawerElems, backbonestickit) {

    var Drawer = PageView.extend({

        /**
         Initialize PageView
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el = $('body');

            window.BB.Elements = new DrawerElems();
            $(BB.Elements.PASS1).val('type password');

            supersonic.ui.views.find("Drawer.html").then(function (view) {
                self.drawerView = view;
            });

            var changedValues = _.debounce(function () {
                log('stickit changed model');
            }, 450);

            self.model = new Backbone.Model({
                password: 'some pass'
            });

            self.model.on('change', changedValues);
            self._bindings();
            self._listenCloseDrawer();
        },

        /**
         Listen Close Drawer
         @method _listenCloseDrawer
         **/
        _listenCloseDrawer: function(){
            var self = this;
            $(BB.Elements.DRAWER_CLOSE).on('click', function () {
                self.closeDrawer();
            })
        },

        /**
         Stickit mvvm 2-way binding with model
         @method _bindings
         **/
        _bindings: function () {
            var self = this;
            self.addBinding(self.model, BB.Elements.PASS1, 'password');
            self.addBinding(self.model, BB.Elements.PASS2, 'password');
            self.stickit();
        },

        /**
         Open the side drawer
         @method openDrawer
         **/
        openDrawer: function () {
            supersonic.ui.drawers.open("leftDrawer").then(function () {
                supersonic.logger.debug("Drawer was shown");
            });
        },

        /**
         Close the side drawer
         @method closeDrawer
         **/
        closeDrawer: function () {
            supersonic.ui.drawers.close("leftDrawer").then(function () {
                supersonic.logger.debug("Drawer was shown");
            });
        }
    });

    return Drawer;
});


