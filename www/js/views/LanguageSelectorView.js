/**
 Create language selector widget
 @class LanguageSelectorView
 @constructor
 @return {Object} instantiated LanguageSelectorView
 **/
define(['jquery', 'backbone', 'localizer'], function ($, Backbone, localizer) {

    var LanguageSelectorView = BB.View.extend({

        /**
         Init the ChannelList component and enable sortable channels UI via drag and drop operations.
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self._listenLangSelection();
            self._setLanguage('en');
        },

        _listenLangSelection: function () {
            var self = this;
            self.$('select').on('change', function (e) {
                var selected = self.$('select').val();
                self._setLanguage(selected);
            })
        },

        /**
         Set specified language and reload the application to apply selection
         @method _setLanguage
         @param {String} i_language
         **/
        _setLanguage: function (i_language) {
            var self = this;
            var opts = {language: i_language, pathPrefix: "./lang"};
            $("[data-localize]").localize("local", opts);

            // Set the title bar text per language
            $(BB.Elements.NAV_BAR_TITLE).text($(BB.Elements.NAV_BAR_TITLE_LOCAL).text());
        }
    });

    return LanguageSelectorView;

});