/**
 Settings Backbone > View
 @class FQCreatorView
 @constructor
 @return {Object} instantiated FQCreatorView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var PageView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            if (!_.isUndefined(self.options)){
                self.m_page = new supersonic.ui.View({
                    location: self.options.location,
                    id: self.options.pageID
                });
                self.m_page.start();
                if (self.options.active == true) {
                    self._initialize();
                }
            } else {
                self._initialize();
            }
        },

        /**
         Override method in sub-class
         @method _initialize
         **/
        _initialize: function () {
        },

        getPageView: function () {
            var self = this;
            return self.m_page;
        }
    });

    return PageView;
});


