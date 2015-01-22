/**
 Settings Backbone > View
 @class FQCreatorView
 @constructor
 @return {Object} instantiated FQCreatorView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var PageView = Backbone.View.extend({

        /**
         Create the Steroids page / view identity
         @method initializePage
         **/
        initializePage: function () {
            var self = this;
            self.m_page = new supersonic.ui.View({
                location: self.location,
                id: self.pageID
            });
            self.m_page.start();
            if (self.options && self.options.init == false)
                return self;
            self._initialize();
            return self;
        },

        /**
         Get page / view instance
         @method getPageView
         **/
        getPageView: function () {
            var self = this;
            return self.m_page;
        }
    });

    return PageView;
});


