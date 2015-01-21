/**
 Settings Backbone > View
 @class LocalCollection
 @constructor
 @return {Object} instantiated FQCreatorView
 **/
define(['jquery', 'backbone', 'backbone.localstorage'], function ($, Backbone, backbonelocalstorage) {

    var uuid = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    var LocalCollection = Backbone.Collection.extend({
        local: true,
        remote: false,
        initialize: function (models, options) {
            var self = this;
            self.locationUrl = options.locationUrl;
            self.collectionID = uuid(); // we use the collection id so we ignore our own events
            log('creating ' + self.locationUrl + ' collection id: ' + self.collectionID);
            self._listenStorageCollectionEvents();
            self._listenToAllMyEvents();
        },
        url: function () {
            var self = this;
            return self.locationUrl;
        },
        _listenToAllMyEvents: function () {
            var self = this;
            this.listenTo(this, 'all', function (event, model) {
                if (_.isUndefined(model.id))
                    return;
                log('announcing event: ' + event + ' ' + self.locationUrl + ' model id: ' + model.id);
                BB.comBroker.fireWebViews(self.locationUrl, window.webViewer, {
                    id: model.id,
                    event: event,
                    locationUrl: self.locationUrl,
                    collectionID: self.collectionID,
                    model: JSON.stringify(model)
                });
            });
        },

        _listenStorageCollectionEvents: function () {
            var self = this;
            BB.comBroker.listenWebViews(self.locationUrl, function (e) {
                if (e.data.collectionID == self.collectionID)
                    return;
                if (e.data && e.data.event == 'sync') {
                    self.onSync(e);
                } else {
                    self.onUpdates(e)
                }
            });
        },

        saveToServer: function (i_state) {
            var self = this;
            if (i_state) {
                self.local = false;
                self.remote = true;
            } else {
                self.local = true;
                self.remote = false;
            }
        },

        deleteStorage: function () {
            var self = this;
            localStorage.clear();
            Store.prototype.clear;
        },

        onUpdates: function (e) {
            //log(JSON.stringify(e));
        },

        onSync: function (e) {
            //log(JSON.stringify(e));
        }//,
    });

    return LocalCollection;
});


