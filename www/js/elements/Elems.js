/**
 Settings Backbone > View
 @class LineListView
 @constructor
 @return {Object} instantiated FQCreatorView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var Elems = Backbone.View.extend({

        initialize: function () {

            this.GO_TO_ANIM_PAGE = '#toToAnimPage';
            this.LOCATION_ID_INPUT = '#locationIdInput';
            this.GET_SERVER_TIME= '#getServerTime';
            this.FIELD1 = '#field1';
            this.FIELD2 = '#field2';
            this.FIELD3 = '#field3';
            this.SEND_PING = '#sendPing';
            this.GO_TO_COMM_PAGE = '#goToCommPage';
            this.SAVE_TO_SERVER ='#saveToServer';
            this.LANGUAGE_SELECTOR = '#languageSelector';
            this.NAV_BAR_TITLE = '#navBarTitle';
            this.NAV_BAR_TITLE_LOCAL = '#navBarTitleLocal';
            this.OPEN_MODAL = '#openModal';

            // templates
            this.LANGUAGE_SELECTOR_TEMPLATE = '#ccc';

            // classes
            this.CLASS_CAMPIGN_LIST_ITEM = '.dddd';
        }
    });

    return Elems;
});


