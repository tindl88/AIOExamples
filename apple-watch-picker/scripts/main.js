var sliderJs = (function(){
	'use strict';
	var mod = $('#mod-slider');
	var sliderCount = mod.find('.item').length;
	var currentSlide = -1;
	var isPlaying = false;

	var scaleOffset = 0.04;
	var topOffset = 20;
	var marginTop = 0;

	setup();

	function setup(){
		var h = mod.find('.item:first').height();
		var scaleVal = 1;
		currentSlide = -1;
		mod.find('.slider').css({marginTop:-marginTop, height:h});
		TweenMax.set($('.item'), {clearProps:'z-index'});

		for (var i = 0; i < sliderCount; i++) {
  			scaleVal += scaleOffset;
			var y = topOffset * i;
  			var scale = scaleVal - (sliderCount * scaleOffset);

			TweenMax.set($('.item:eq('+i+')'), {y:y, scale:scale});
		}
	}

	function gotoSlide(){
		var array = [];
		for (var i = 0; i < sliderCount; i++) {
			array.push(i);
		}

		if(isPlaying) return;
		isPlaying = true;
		currentSlide++;

		var tmp = array.splice(0, currentSlide);
		var result = array.concat(tmp);

		var scaleVal = 1;
		for (var i = 0; i < result.length; i++) {
			scaleVal += scaleOffset;
			var y = topOffset * i - topOffset;
			var scale = scaleVal - (sliderCount * scaleOffset) - scaleOffset;
			TweenMax.to($('.item:eq('+result[i]+')'),1, {y:y, scale:scale});
		}

		TweenMax.killTweensOf($('.item:eq('+currentSlide+')'));
		TweenMax.to($('.item:eq('+currentSlide+')'),0, {scale:1, yPercent:150, onComplete: function(){
			$('.item:eq('+currentSlide+')').css({zIndex:currentSlide + 1});
			TweenMax.to($('.item:eq('+currentSlide+')'),1, {y:(sliderCount-1) * topOffset, yPercent:0, onComplete: function(){
				TweenMax.delayedCall(0.2, function(){
					if(currentSlide+1 === sliderCount){
						setup();
					}
					isPlaying = false;
				});
			}});
		}});
	}

	return {
		reset: setup,
		gotoSlide: gotoSlide
	};
})();