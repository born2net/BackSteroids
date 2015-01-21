/**
 AuthCollection Backbone > View
 @class AuthCollection
 @constructor
 @return {Object} instantiated AuthCollection
 **/
define(['jquery', 'backbone', 'LocalCollection'], function ($, Backbone, LocalCollection) {

    var AuthCollection = LocalCollection.extend({
        model: Backbone.Model,

        initialize: function (options) {
            var self = this;
            LocalCollection.prototype.initialize.apply(this, arguments);
        },

        onUpdates: function (e) {
            // log('onUpdates:  ' + JSON.stringify(e));
        },

        onSync: function (e) {
            var self = this;
            var changedModelId = e.data.id;
            self.fetch();
            log('Auth on sync: modelID: ' + changedModelId + ' locationURL: ' + self.locationUrl + ' JSON: ' + JSON.stringify(e) + ' models: ' + self.models);
            var changedData = self.get(changedModelId).get('foo');
            // alert('change data ' + changedData);

            switch (self.locationUrl){
                case '/cat': {
                    $(BB.Elements.FIELD1).val(changedData);
                    break;
                }
                case '/dog': {
                    $(BB.Elements.FIELD2).val(changedData);
                    break;
                }
                case '/lion': {
                    $(BB.Elements.FIELD3).val(changedData);
                    break;
                }
            }
        }
    });

    return AuthCollection;
});


