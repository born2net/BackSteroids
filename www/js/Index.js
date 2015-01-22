/**
 BackSteroids, License MIT
 Visit Github https://github.com/born2net/BackSteroids
 @class App
 @constructor
 @return {Object} instantiated App
 **/
define(['Setup', 'LocalCollection', 'AuthCollection', 'Elems', 'StackView', 'NoteModel'], function (Setup, LocalCollection, AuthCollection, Elems, StackView, NoteModel) {
    var App = Backbone.Controller.extend({
        initialize: function () {
            var self = this;
            log('======================================');
            window.BB.Elements = new Elems();
            // localization
            require(['LanguageSelectorView'], function (LanguageSelectorView) {
                new LanguageSelectorView({el: BB.Elements.LANGUAGE_SELECTOR});
            });

            LocalCollection.prototype.deleteStorage();
            self._initDrawer();
            self._initPages();
            self._initModelsCollection();
            self._listenOrientationChange();
            self._listenGoToCommPage();
            self._listenGetServerTime();
            self._listenSendPing();

            $(BB.Elements.GO_TO_ANIM_PAGE).on('click', function (e) {
                supersonic.ui.layers.push(self.m_coolAnimView.getPageView());
            });
        },

        /**
         Create all the models and collections that we use to communicate with other pages and to server
         @method _initModelsCollection
         **/
        _initModelsCollection: function() {
            var self = this, note

            self.myNotes1 = new AuthCollection([], {locationUrl: '/cat'});
            var note = new NoteModel();
            self.myNotes1.add(note);
            note.save();
            self.myNotes1.fetch();

            self.myNotes2 = new AuthCollection([], {locationUrl: '/dog'});
            var note = new Backbone.Model({'foo': 'bar1'});
            self.myNotes2.add(note);
            note.save();
            self.myNotes2.fetch();

            self.myNotes3 = new AuthCollection([], {locationUrl: '/lion'});
            var note = new Backbone.Model({'foo': 'bar2'});
            self.myNotes3.add(note);
            note.save();

            $(BB.Elements.FIELD1).on('blur', function (e) {
                var val = $(this).val();
                self.myNotes1.at(0).set('foo', val);
                self.myNotes1.at(0).save();
            });

            $(BB.Elements.FIELD2).on('blur', function (e) {
                var val = $(this).val();
                self.myNotes2.at(0).set('foo', val);
                self.myNotes2.at(0).save();
            });

            $(BB.Elements.FIELD3).on('blur', function (e) {
                var val = $(this).val();
                self.myNotes3.at(0).set('foo', val);
                self.myNotes3.at(0).save();
            });

            $(BB.Elements.SAVE_TO_SERVER).on('click', function (e) {
                self.myNotes1.saveToServer(true);
                self.myNotes1.at(0).save({}, {
                    success: function (model) {
                        jlog(model);
                        alert('save success ' + model.get('date'));
                    },
                    error: function (model, e) {
                        alert('err 2 ' + e.responseText);
                        setTimeout(function () {
                            log(JSON.stringify(e));
                        }, 3000)
                    },
                    complete: function () {
                        self.myNotes1.saveToServer(false);
                    }
                });
            });
        },

        /**
         Listen get server time
         @method _listenGetServerTime
         **/
        _listenGetServerTime: function(){
            var self = this;
            $(BB.Elements.GET_SERVER_TIME).on('click', function (e) {
                $.ajax({
                    url: 'https://secure.digitalsignage.com:443/GetDateTime',
                    success: function (dateTime) {
                        alert('time is ' + dateTime.time)
                    },
                    error: function (e) {
                        alert('err 3 ' + JSON.stringify(e));
                    },
                    dataType: 'json'
                });
            });
        },

        /**
         Listen to go to CommPage
         @method _listenGoToCommPage
         **/
        _listenGoToCommPage: function(){
            var self = this;
            $(BB.Elements.GO_TO_COMM_PAGE).on('click',function(){
                supersonic.ui.layers.push(self.m_commPageView.getPageView());
            });
        },

        /**
         Init the CoolAnim page and Comm page
         @method _initPages
         **/
        _initPages: function(){
            var self = this;
            require(['StackView', 'CoolAnimView', 'CommPageView'], function (StackView, CoolAnimView, CommPageView) {


                self.m_coolAnimView = new CoolAnimView({
                    init: false
                }).initializePage();

                self.m_commPageView = new CommPageView({
                    init: false
                }).initializePage();

                //self.m_coolAnimView = (new CoolAnimView({init: false}));
                //self.m_coolAnimView.initializePage();

                // self.m_commPageView = new CommPageView({init: false});
                // self.m_commPageView.initializePage();

                // self.m_stackView = new StackView.Fader({duration: 1});

                //var unsubscribe = supersonic.data.channel('events').subscribe(function (message, reply) {
                //    alert('from : ' + message.from + ' ' + message.data);
                //    var msg = {
                //        from: 'app3',
                //        data: 'message 2'
                //    };
                //    reply(msg);
                //});
            });
        },

        /**
         Init the Drawer Module on left side of app, we use timer to let app settle down
         @method _initDrawer
         **/
        _initDrawer: function () {
            var self = this;
            /*
             Uncomment the following lines if you wish to create the drawer manually
             Be sure to change the the location entry under structure.coffee to: location: ""
             so you can create the drawer in code instead...
             */

            //setTimeout(function () {
            //    self.m_leftDrawer = new steroids.views.WebView("/pages/Drawer.html");
            //    function updateDrawer() {
            //        steroids.drawers.update({
            //            left: self.m_leftDrawer
            //        });
            //    }
            //   self.m_leftDrawer.preload({}, {
            //        onSuccess: updateDrawer
            //    });
            //}, 50);
        },

        /**
         Listen to click on ping button
         @method _listenOrientationChange
         **/
        _listenSendPing: function(){
            var self = this;
            $(BB.Elements.SEND_PING).on('click', function () {
                BB.comBroker.fireWebViews('pingpong', window.webViewer, {ping: 'echo'});
            });
        },

        /**
         Listen application orientation changess
         @method _listenOrientationChange
         **/
        _listenOrientationChange: function () {
            window.addEventListener('orientationchange', function () {
                switch (window.orientation) {
                    case -90:
                    case 90:
                        alert('landscape');
                        break;
                    default:
                        alert('portrait');
                        break;
                }
            });
        }
    });
    return App;
});