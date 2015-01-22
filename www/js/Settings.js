/**
 SettingsView Backbone > View
 @class SettingsView
 @constructor
 @return {Object} instantiated SettingsView
 **/
define(['PageView', 'Setup', 'SettingsElems'], function (PageView, Setup, SettingsElems) {

    var SettingsView = PageView.extend({

        /**
         Initialize PageView
         **/
        initialize: function () {
            var self = this;
            window.BB.Elements = new SettingsElems();
            self._listenToggleTabs();
            self._listenOpenModelView();
        },

        /**
         Open a model view
         @method this.OPEN_MODEL_VIEW
         **/
        _listenOpenModelView: function(){
            var self = this;
            self.m_modalPage = new supersonic.ui.View({
                location: "/pages/Modal.html",
                id: "modalView"
            });

            // don't start the modal right off the start, so we don't choke the os
            setTimeout(function(){
                self.m_modalPage.start();
            },2000);

            $(BB.Elements.OPEN_MODEL_VIEW).on('click',function(){
                // a bit of delay before open modal so we don't choke the os
                setTimeout(function(){
                    supersonic.ui.modal.show(self.m_modalPage, {animate: false});
                },1200);
            })
        },

        /**
         Listen to change in checkbox for toggling boot app tab bar
         @method setPlayerData
         @param {Number} i_playerData
         @return {Number} Unique clientId.
         **/
        _listenToggleTabs: function () {
            var self = this;
            $(BB.Elements.TOGGLE_TABS).on('change', function (e) {
                var v = $(e.target).prop('checked') == true ? 1 : 0;
                if (v) {
                    self._showTabs();
                } else {
                    self._hideTabs();
                }
            });
        },

        /**
         Hide the app tabs
         @method _hideTabs
         **/
        _hideTabs: function () {
            supersonic.ui.tabs.show();
        },

        /**
         Show the app tabs
         @method _hideTabs
         **/
        _showTabs: function () {
            supersonic.ui.tabs.hide();
        }
    });

    return SettingsView;
});


