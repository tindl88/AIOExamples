(function(){
	'use strict';

	var controller = new ScrollMagic.Controller();
    var $mod = $('#mod-scroll-magic');

    // Section 1
    var section1 = $mod.find('.section1');
    var timeline1 = new TimelineMax({
      onComplete: function() {
        scene1.destroy();
      }
    });
    timeline1.add(TweenMax.staggerFrom(section1.find('h1'), 0.6, {css: {alpha: 0}, ease: Back.easeInOut}, 0.1));
    timeline1.add(TweenMax.staggerFrom(section1.find('p'), 0.2, {css: {alpha: 0}}, 0.1));

    var scene1 = new ScrollMagic.Scene({
      triggerElement: '.section1',
      offset: -90
    })
      .addIndicators({name: 'Section 1'})
      .setTween(timeline1);

    // Section 2
    var section2 = $mod.find('.section2');
    var timeline2 = new TimelineMax({
      onComplete: function() {
        scene2.destroy();
      }
    });
    timeline2.add(TweenMax.staggerFrom(section2.find('.row>div'), 0.5, {css: {alpha: 0}, ease: Back.easeInOut}, 0.1));
    var scene2 = new ScrollMagic.Scene({
      triggerElement: '.section2',
      offset: -90
    })
      .addIndicators({name: 'Section 2'})
      .setTween(timeline2);

    // Add scenes
    controller.addScene([scene1, scene2]);
})();