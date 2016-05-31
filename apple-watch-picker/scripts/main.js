var sliderJs = (function(){
	'use strict';
	var mod = $('#mod-slider');
	var sliderCount = mod.find('.item').length;
	var currentSlide = -1;
	var isPlaying = false;

	var scaleOffset = 0.04;
	var topOffset = 20;
	var marginTop = 0;

	init();

	function init(){
		var h = mod.find('.item:first').height();
		currentSlide = -1;
		mod.find('.slider').css({marginTop:-marginTop, height:h});
		TweenMax.set($('.item'), {clearProps:'z-index'});

		TweenMax.set($('.item').eq(0), {y:0, scale:0.92, transformOrigin:'center top'});
		TweenMax.set($('.item').eq(1), {y:20, scale:0.96, transformOrigin:'center top'});
		TweenMax.set($('.item').eq(2), {y:40, scale:1, transformOrigin:'center top'});
	}

	function gotoSlide(offset){
		currentSlide++;

		switch(currentSlide){
			case 0:
			if(offset>0){
				TweenMax.to($('.item').eq(0), 0.2, {yPercent:100, onComplete:function(){
					TweenMax.set($('.item').eq(0), {scale:1, zIndex:1});
					TweenMax.to($('.item').eq(0), 0.5, {y:40, yPercent:0});
				}});
				TweenMax.to($('.item').eq(1), 0.5, {y:0, scale:0.92});
				TweenMax.to($('.item').eq(2), 0.5, {y:20, scale:0.96});
			} else {
				TweenMax.to($('.item').eq(2), 0.3, {yPercent:100, onComplete:function(){
					TweenMax.set($('.item').eq(2), {scale:0.92, zIndex:-1});
					TweenMax.to($('.item').eq(2), 0.2, {y:0, yPercent:0});
				}});
				TweenMax.to($('.item').eq(1), 0.5, {y:40, scale:1});
				TweenMax.to($('.item').eq(0), 0.5, {y:20, scale:0.96});
			}
			break;
			case 1:
			if(offset>0){
				TweenMax.to($('.item').eq(1), 0.1, {yPercent:100, onComplete:function(){
					TweenMax.set($('.item').eq(1), {scale:1, zIndex:1});
					TweenMax.to($('.item').eq(1), 0.5, {y:40, yPercent:0});
				}});
				TweenMax.to($('.item').eq(2), 0.5, {y:0, scale:0.92});
				TweenMax.to($('.item').eq(0), 0.5, {y:20, scale:0.96});
			} else {

			}
			break;
			case 2:
			if(offset>0){
				TweenMax.to($('.item').eq(2), 0.1, {yPercent:100, onComplete:function(){
					TweenMax.set($('.item').eq(2), {scale:1, zIndex:1});
					TweenMax.to($('.item').eq(2), 0.5, {y:40, yPercent:0});
				}});
				TweenMax.to($('.item').eq(0), 0.5, {y:0, scale:0.92});
				TweenMax.to($('.item').eq(1), 0.5, {y:20, scale:0.96});
			} else {

			}
			break;
		}
	}

	return {
		init: init,
		gotoSlide: gotoSlide
	};
})();