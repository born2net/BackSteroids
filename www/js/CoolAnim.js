/**
 CoolAnim
 @class CoolAnim
 @constructor
 @return {Object} instantiated CoolAnim
 **/
define(['Setup', 'CoolAnimElems'], function (Setup, CoolAnimElems) {
    var CoolAnim = Backbone.Controller.extend({
        initialize: function () {
            var self = this;
            window.BB.Elements = new CoolAnimElems();

            require(['StackView', 'CoolAnimView'], function (StackView, CoolAnimView) {

                self.m_coolAnimView = new CoolAnimView({
                    el: 'body'
                }).initializePage();
            });
        }
    });
    return CoolAnim;
});