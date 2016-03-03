(function(){
	'use strict';

	var mod = $('#mod-csoon'),
	win = $(window),
	tl1 = new TimelineMax({paused:true}),
	tl2 = new TimelineMax({paused:true}),
	tl3 = new TimelineMax({paused:true}),
	slickCurrentIndex = 0,
	slickChangedCount = 0,
	AUTO_PLAY_SPEED = 3000;

	win.load(function(){
		var imgs = ['images/frame1.jpg','images/frame2.jpg','images/frame3.jpg'];
		preloader(imgs, function(){
			setTimeout(function(resp){
				makeSlide();
			},100);
		});

		makeTimeline();
	});

	function makeSlide(){
		mod.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			slickCurrentIndex = nextSlide;
			slickChangedCount++;
		});
		mod.on('afterChange', function(event, slick, currentSlide){
			animmation(slickCurrentIndex);

			if(slickChangedCount === 2){
				mod.slick('slickSetOption', 'autoplaySpeed', AUTO_PLAY_SPEED * 2);
			} else {
				mod.slick('slickSetOption', 'autoplaySpeed', AUTO_PLAY_SPEED);
			}
		});
		mod.on('init', function(event, slick){
			$('.loading').fadeOut(1000, function(){
				animmation(0);
			});
		});
		mod.slick({
			arrows:false,
			fade:true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: AUTO_PLAY_SPEED,
			pauseOnHover: false
		});
	}

	function makeTimeline(){

		// Frame1
		tl1.from('.frame0 .float-image', 1, {xPercent:-100, ease: Power2.easeOut});

		// Frame2
		tl2.from('.frame1 .float-image', 1, {xPercent:-100, ease: Power2.easeOut});

		// Frame 3
		var mySplitText = new SplitText('.text', {type:'words,chars'}),
		chars = mySplitText.chars;
		TweenLite.set('.text', {perspective:600});
		tl3.fromTo('.box', 1, {rotation:360,borderColor:'transparent'}, {rotation:0, borderColor:'#fff', ease:Back.easeInOut})
		.staggerFrom(chars, 1.2, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:'0% 50% -50', textShadow:'0px 0px 0px #222, 0px 0px 0px #222', ease:Back.easeOut}, 0.02)
		.from('.commming-soon', 0.7, {autoAlpha:0, scale:3, ease:Back.easeOut});

	}

	function animmation(frameIdx){
		switch(frameIdx){
			case 0:
			tl1.play();
			break;
			case 1:
			tl2.play();
			break;
			case 2:
			tl3.play();
			break;
		}
	}

	function preloader(imgArray, callback){
		var loaded = 0;
		var len = imgArray.length;
		if(len){
			for (var i = 0; i < len; i++) {
				var img = new Image();
				img.src = imgArray[i];
				img.onload = function(event){
					complete(len);
					console.log('File loaded: ', event.target.currentSrc);
				};

				img.onerror = function(event){
					complete(len);
					console.log('Cannot load file: ', event.target.currentSrc);
				};
			};
		}

		function complete(count){
			loaded++;
			if(loaded === count){
				callback(loaded);
			}
		}
		return loaded;
	}
})();