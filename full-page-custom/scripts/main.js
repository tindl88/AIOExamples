(function(){
	'use strict';

	var currentFrame = 0;
	var win = $(window);
	var isSwipe = false;
	var dir = '';
	var mod = $('#mod-csoon');
	var btnPrev = $('.btn-prev');
	var btnNext = $('.btn-next');
	var repeat = 0;

	win.load(function(){
		controls();
	});

	function controls(){
		btnPrev.on('click', function(event) {
			currentFrame--;
			if(currentFrame < 0)
				currentFrame = 0;

			gotoFrame(currentFrame);
		});
		btnNext.on('click', function(event) {
			currentFrame++;
			if(currentFrame > 3)
				currentFrame = 3;
			gotoFrame(currentFrame);
		});


		mod.swipe({
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				isSwipe = true;
				dir = direction;

				if(direction === 'up' && distance > 100){
					btnNext.trigger('click');
				} else {
					btnPrev.trigger('click');
				}
			},
			excludedElements: 'label, button, input, select, textarea, .noSwipe'
		});
	}

	function gotoFrame(index){
		console.log(dir);
		console.log(currentFrame);
		if(index === 3 && dir ==='up'){
			$('form').fadeIn(300);
		} else if(index == 2 && dir ==='down'){
			$('form').fadeOut(300);
		} else {
			TweenMax.to(mod, 0.5, {yPercent: -(100 * index), onComplete: function(){
			}});
		}
	}
})();