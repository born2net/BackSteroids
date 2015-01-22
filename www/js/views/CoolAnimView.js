/**
 CoolAnimView Backbone > View
 @class CoolAnimView
 @constructor
 @return {Object} instantiated CoolAnimView
 **/
define(['jquery', 'backbone', 'PageView', 'CSSPlugin', 'TweenMax', 'StackView'], function ($, Backbone, PageView, CSSPlugin, TweenMax, StackView) {

    var CoolAnimView = PageView.extend({

        location: "/pages/CoolAnimPage.html",
        pageID: "CoolAnim",

        /**
         Init called from PageView base class
         @method _initialize
         **/
        _initialize: function () {
            var self = this;
            self.m_slideIndex = 1;
            self.m_fadeIndex = 1;
            self.m_like = 1;

            self.model = new Backbone.Model({
                userName: 'Sean Levy'
            });

            // BB.comBroker.fireWebViews('event1', window.webViewer, {hello: 'world'});

            self._listenLikeClick();
            self._initStackViewSlider();
            self._initStackViewFader();
            self._initImageAnimation();
        },

        /**
         Listen to FB like clicks and increase counter
         @method _listenLikeClick
         **/
        _listenLikeClick: function(){
            var self = this;
            $(BB.Elements.LIKE).on('click', function (e) {
                $(BB.Elements.LIKE).text((self.m_like++) +' like');
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            });
        },

        /**
         Use the amazing StackView.Slider to scroll through pages using GPU animation
         @method _initStackViewFader
         **/
        _initStackViewFader: function () {
            var self = this;

            self.m_faderContainer = new StackView.Fader({
                el: '#stackContainerFader'
            });

            self.f1 = new Backbone.View({
                el: "#f1"
            });
            self.f2 = new Backbone.View({
                el: "#f2"
            });
            self.f3 = new Backbone.View({
                el: "#f3"
            });

            self.m_faderContainer.addView(self.f1);
            self.m_faderContainer.addView(self.f2);
            self.m_faderContainer.addView(self.f3);
            self.m_faderContainer.selectView(self.f1);

            $(BB.Elements.NEXT_FADE).on('click', function () {
                self.m_fadeIndex = self.m_fadeIndex == 3 ? 1 : self.m_fadeIndex + 1;
                self.m_faderContainer.selectView('#f' + self.m_fadeIndex);
            });

            $(BB.Elements.PREV_FADE).on('click', function () {
                self.m_fadeIndex = self.m_fadeIndex == 1 ? 3 : self.m_fadeIndex - 1;
                self.m_faderContainer.selectView('#f' + self.m_fadeIndex);
            });
        },

        /**
         Use the amazing StackView.Fader to scroll through pages using fade animation
         @method _initStackViewSlider
         **/
        _initStackViewSlider: function () {
            var self = this;

            self.m_slideContainer = new StackView.Slider({
                el: '#stackContainer'
            });
            self.p1 = new StackView.Slider({
                stackView: self.m_slideContainer,
                from: "#p3",
                el: "#p1",
                to: "#p2"
            });

            self.p2 = new StackView.Slider({
                stackView: self.m_slideContainer,
                from: "#p1",
                el: "#p2",
                to: "#p3"
            });

            self.p3 = new StackView.Slider({
                stackView: self.m_slideContainer,
                from: "#p2",
                el: "#p3",
                to: "#p1"
            });

            self.m_slideContainer.addView(self.p1);
            self.m_slideContainer.addView(self.p2);
            self.m_slideContainer.addView(self.p3);
            self.m_slideContainer.selectView(self.p1);

            $(BB.Elements.NEXT_SLIDE).on('click', function () {
                self.m_slideIndex = self.m_slideIndex == 3 ? 1 : self.m_slideIndex + 1;
                self.m_slideContainer.slideToPage(self['p' + self.m_slideIndex], 'right');
            });

            $(BB.Elements.PREV_SLIDE).on('click', function () {
                self.m_slideIndex = self.m_slideIndex == 1 ? 3 : self.m_slideIndex - 1;
                self.m_slideContainer.slideToPage(self['p' + self.m_slideIndex], 'left');
            });

            /*
             BB.comBroker.setService(BB.SERVICES.CAMPAIGN_SELECTOR, self.m_campaignSelectorView);
             supersonic.ui.tabs.updateCurrentTab({title: "aaaa"});

             supersonic.ui.views.find("CommPage").then(function (view) {
             supersonic.logger.log("view location: " + view.getLocation());
             supersonic.ui.layers.push(view);
             //supersonic.ui.modal.show(view);
             setTimeout(function () {
             supersonic.ui.layers.pop(view);
             // supersonic.ui.modal.hide(view);
             }, 6000)
             });
             */

        },

        /**
         Use the GPU powered transition, powered by the amazing GSAP lib: http://greensock.com
         @method _initStackViewSlider
         **/
        _initImageAnimation: function () {
            var self = this;

            CSSPlugin.defaultTransformPerspective = 1500;

            var $imgWrap = $('.images'),
                $images = $imgWrap.find('img'),
                $currImg = $images.eq(0),
                index = 0,
                numImgs = $images.length,
                isAnimating = false;

            // Animation properties
            var flipDepth = -500,
                flipDur = 1;

            var flip = function (e) {
                // Ignore click until any current animations have completed.
                if (isAnimating) return;

                isAnimating = true;

                // Add +1 to index or loop back to 0 if we've reached the end
                index = (index++ >= numImgs - 1) ? 0 : index;

                // Get a random value between -25 and 25
                var randomVal = Math.random() * 50 - 25;

                var tl = new TimelineLite({
                    onComplete: function () {
                        $currImg = $images.eq(index);
                        isAnimating = false;
                    }
                });

                tl.to($currImg, flipDur / 2, {
                    css: {rotationY: 90, z: flipDepth, rotationX: randomVal, alpha: 0.3},
                    ease: Expo.easeIn
                });

                tl.append(function () {
                    $currImg.hide();
                    $images.eq(index).show();
                })

                tl.fromTo($images.eq(index), flipDur / 2,
                    // We need to flip the number sign fo rotationX, so we do -randomVal instead of randomVal
                    {css: {rotationY: -90, z: flipDepth, rotationX: -randomVal, alpha: 0.3}},
                    {css: {rotationY: 0, z: 0, rotationX: 0, alpha: 1}, ease: Expo.easeOut}
                );
            };

            // Animate first image in
            TweenMax.fromTo($currImg, 1.8,
                {css: {rotationY: -110, rotationX: Math.random() * 35, z: -1000, alpha: 0}},
                {
                    css: {rotationY: 0, rotationX: 0, z: 0, alpha: 1}, ease: Power3.easeInOut, onComplete: function () {
                    $imgWrap.on('click', flip);
                }
                });

            $currImg.show();
        }
    });

    return CoolAnimView;
});


