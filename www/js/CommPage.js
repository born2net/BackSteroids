/**
 CommPage
 @class CommPage
 @constructor
 @return {Object} instantiated CommPage
 **/
define(['Setup', 'CommPageElems'], function (Setup, CommPageElems) {
    var CommPage = Backbone.Controller.extend({
        initialize: function () {
            var self = this;
            window.BB.Elements = new CommPageElems();

            require(['StackView', 'CommPageView'], function (StackView, CommPageView) {

                self.m_coolAnimView = new CommPageView({
                    el: 'body'
                }).initializePage();
            });
        }
    });
    return CommPage;
});