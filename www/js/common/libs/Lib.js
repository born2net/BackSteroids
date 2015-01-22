/**
 Lib is a general library of additional utilities and helper commands used in StudioLite
 @class Lib
 @constructor
 @return {Object} instantiated Lib
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var Lib = function (type) {
        this.type = type;
    };

    _.extend(Lib.prototype, {

        CONSTS: {
            AUTH_USER_PASS: 0,
            AUTH_COOKIE: 1,
            COOKIE_KEY: 'example_dom'
        },

        /**
         Output formatted string to console and omit error on old browsers
         @method log
         @param {String} msg
         **/
        log: function (msg) {
            if (!window.debug)
                return;
            supersonic.logger.log(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + ': ' + msg);
        },

        jlog: function (msg) {
            if (!window.debug)
                return;
            supersonic.logger.log(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + ': ' + JSON.stringify(msg));
        },

        /**
         Add the now deprecated Backbone > View > Options so we can pass as args to new views
         @method addBackboneViewOptions
         **/
        addBackboneOptions: function () {
            Backbone.View = (function (View) {
                return View.extend({
                    constructor: function (options) {
                        this.options = options || {};
                        View.apply(this, arguments);
                    }
                });
            })(Backbone.View);

            /*
            Backbone.Collection = (function (Collection) {
                return Collection.extend({
                    constructor: function (options) {
                        this.options = options || {};
                        Collection.apply(this, arguments);
                    }
                });
            })(Backbone.Collection);
            */
        },

        /**
         Add to backbone collection save option
         @method addBackboneCollectionSave
         **/
        addBackboneCollectionSave: function () {
            Backbone.Collection.prototype.save = function (options) {
                Backbone.sync("create", this, options);
            };
        },

        /**
         Validate email address format using regexp
         @method validateEmail
         @param {String} emailAddress
         @return {Boolean}
         **/
        validateEmail: function (emailAddress) {
            var emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
            var valid = emailRegex.test(emailAddress);
            if (!valid) {
                return false;
            } else {
                return true;
            }
        },

        /**
         Set user agent / browser version
         @method initUserAgent
         **/
        initUserAgent: function () {

            var ua = navigator.userAgent.toLowerCase(),
                match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                    /(msie) ([\w.]+)/.exec(ua) ||
                    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [],
                browser = match[1] || "",
                version = match[2] || "0";

            $.browser = {};
            $.browser.type = '';

            if (browser) {
                $.browser[browser] = true;
                $.browser.version = version;
            }

            // Chrome is Webkit, but Webkit is also Safari.
            if (jQuery.browser.chrome) {
                jQuery.browser.webkit = true;
            } else if (jQuery.browser.webkit) {
                jQuery.browser.safari = true;
            }

            if (!(window.mozInnerScreenX == null)) {
                $.browser.type = 'FF';
                return;
            }

            if ($.browser.msie) {
                $.browser.type = 'IE';
            }

            if (/Android/i.test(navigator.userAgent)) {
                $.browser.type = 'ANDROID';
            }

            if (/webOS/i.test(navigator.userAgent)) {
                $.browser.type = 'WEBOS';
            }

            if (/iPhone/i.test(navigator.userAgent)) {
                $.browser.type = 'IPHONE';
            }

            if (/iPad/i.test(navigator.userAgent)) {
                $.browser.type = 'IPAD';
            }

            if (/iPod/i.test(navigator.userAgent)) {
                $.browser.type = 'IPOD';
            }

            if (/BlackBerry/i.test(navigator.userAgent)) {
                $.browser.type = 'BLACKBARRY';
            }

            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                $.browser.type = 'SAFARI';
                return;
            }
        },

        /**
         Simplify a string to basic character set
         @method cleanChar
         @param {String} value
         @return {String} cleaned string
         **/
        cleanChar: function (value) {
            if (value == null)
                value = '';
            if ($.isNumeric(value))
                return value;
            value = value.replace(/,/g, ' ');
            value = value.replace(/\\}/g, ' ');
            value = value.replace(/{/g, ' ');
            value = value.replace(/"/g, ' ');
            value = value.replace(/'/g, ' ');
            value = value.replace(/&/g, 'and');
            value = value.replace(/>/g, ' ');
            value = value.replace(/</g, ' ');
            value = value.replace(/\[/g, ' ');
            value = value.replace(/]/g, ' ');
            return value;
        },

        unclass: function (value) {
            return value.replace(/\./g, '');
        },

        unhash: function (value) {
            return value.replace(/\#/g, '');
        },


        /**
         Get DOM comment string
         @method getComment
         @param {String} str
         @return {String} string of comment if retrieved
         **/
        getComment: function (str) {
            var content = jQuery('body').html();
            var search = '<!-- ' + str + '.*?-->';
            var re = new RegExp(search, 'g');
            var data = content.match(re);
            var myRegexp = /<!-- (.*?) -->/g;
            var match = myRegexp.exec(data);
            if (match == null) {
                return undefined
            } else {
                return match[1];
            }
        },

        /**
         Convert an XML data format to a DOM enabled data structure
         @method parseXml
         @param {XML} xml data to parse
         @return {Object} xml data structure
         **/
        parseXml: function (xml) {
            var dom = null;
            if (window.DOMParser) {
                try {
                    dom = (new DOMParser()).parseFromString(xml, "text/xml");
                }
                catch (e) {
                    dom = null;
                }
            }
            else if (window.ActiveXObject) {
                try {
                    dom = new ActiveXObject('Microsoft.XMLDOM');
                    dom.async = false;
                    if (!dom.loadXML(xml)) // parse error ..

                        window.alert('alt ' + dom.parseError.reason + dom.parseError.srcText);
                }
                catch (e) {
                    dom = null;
                }
            }
            else
                alert("cannot parse xml string!");
            return dom;
        },

        /**
         Convert number or string to float with double precision
         @method parseToFloatDouble
         @param {Object} i_value
         @return {Number}
         **/
        parseToFloatDouble: function (i_value) {
            return parseFloat(parseFloat(i_value).toFixed(2));
        },

        /**
         Get specific param name from URL
         @method function
         @param {String} i_name
         @return {String}
         **/
        getURLParameter: function (i_name) {
            return decodeURIComponent(
                (location.search.match(RegExp("[?|&]" + i_name + '=(.+?)(&|$)')) || [, null])[1]
            );
        },

        /**
         Returns Epoch base time
         @method getEpochTime
         @return {Number}
         **/
        getEpochTime: function () {
            var d = new Date();
            var n = d.getTime();
            return n;
        },

        decimalToHex: function (d) {
            var hex = Number(d).toString(16);
            hex = "000000".substr(0, 6 - hex.length) + hex;
            return hex;
        },

        hexToDecimal: function (h) {
            var h = h.replace(/#/gi, '');
            return parseInt(h, 16);
        },

        rgbToHex: function (rgb) {
            function componentFromStr(numStr, percent) {
                var num = Math.max(0, parseInt(numStr, 10));
                return percent ?
                    Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
            }

            var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
            var result, r, g, b, hex = "";
            if ((result = rgbRegex.exec(rgb))) {
                r = componentFromStr(result[1], result[2]);
                g = componentFromStr(result[3], result[4]);
                b = componentFromStr(result[5], result[6]);
                hex = (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }
            return hex;
        },

        colorToDecimal: function (color) {
            if (color.match('rgb')) {
                color = this.rgbToHex(color);
                return this.hexToDecimal(color)
            }
            return this.hexToDecimal(color);
        },

        colorToHex: function (color) {
            if (color.match('#')) {
                return color;
            }
            if (color.match('rgb')) {
                return '#' + this.rgbToHex(color);
            }
            return '#' + color;
        },

        capitaliseFirst: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        },

        setIntervalTimes: function (i_func, i_sleep, i_timesRun) {
            var timesRun = 0;
            var interval = setInterval(function () {
                timesRun += 1;
                if (timesRun === i_timesRun) {
                    clearInterval(interval);
                }
                i_func();
            }, i_sleep);
        },

        logout: function () {
            $.removeCookie(BB.lib.CONSTS.COOKIE_KEY, {path: '/'});
            $.cookie(BB.lib.CONSTS.COOKIE_KEY, '', {expires: -300});
        },

        removeCookie: function () {
            $.removeCookie(BB.lib.CONSTS.COOKIE_KEY, {path: '/'});
            $.removeCookie(BB.lib.CONSTS.COOKIE_KEY, {path: '/_studiolite'});
            $.removeCookie(BB.lib.CONSTS.COOKIE_KEY, {path: '/_studiolite-dev'});
            $.removeCookie(BB.lib.CONSTS.COOKIE_KEY, {path: '/_studiolite-dist'});
        },

        bakeCookie: function (i_user, i_pass) {
            var rc4 = new RC4(BB.globs['RC4KEY']);
            var crumb = i_user + ':SignageStudioLite:' + i_pass + ':' + ' USER'
            crumb = rc4.doEncrypt(crumb);
            $.cookie(BB.lib.CONSTS.COOKIE_KEY, crumb, {expires: 300});
        },

        getCookieCredentials: function () {
            var cookieCredentials = $.cookie(BB.lib.CONSTS.COOKIE_KEY) == undefined ? undefined : $.cookie(BB.lib.CONSTS.COOKIE_KEY).split(' ')[0];
            if (cookieCredentials) {
                var rc4 = new RC4(BB.globs['RC4KEY']);
                var crumb = rc4.doDecrypt(cookieCredentials).split(':');
                return {user: crumb[0], pass: crumb[2]};
            }
            return undefined;
        },

        sendSecJson: function (i_cmd, i_jData, i_callback, i_port, i_type, i_user, i_pass) {
            var user, pass, authMode;
            if (i_user) {
                user = i_user;
                pass = i_pass;
                authMode = BB.lib.CONSTS.AUTH_USER_PASS;
            } else {
                var credentials = BB.lib.getCookieCredentials();
                if (credentials) {
                    user = credentials.user;
                    pass = credentials.pass;
                    authMode = BB.lib.CONSTS.AUTH_COOKIE;
                }
            }
            if (user) {
                var data = {
                    user: user,
                    pass: pass
                };
                _.extend(data, i_jData);
            }

            var url = 'https://secure.example.com:' + (i_port || 443) + '/' + i_cmd + '/';
            $.ajax({
                url: url,
                type: (i_type || "POST"),
                crossDomain: true,
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                success: function (res) {
                    i_callback(null, res)
                },
                error: function (res) {
                    i_callback('err', res)
                }
            });

            return authMode;
        }

    });

    return Lib;
});

