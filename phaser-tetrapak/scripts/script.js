(function(){
	'use strict';

	$(document).ready(function() {
		draw();

		$('.btnPreview').on('click', function(event) {
			var base64 = getBase64($('canvas')[0]);
			$('#preview').attr('src', base64);
		});
	});

	function draw(){
		var PADDING = 20;
		var width = 1200, height = 630;

		var pixelRatio = window.devicePixelRatio;

		var config = {
			width: width,
			height: height,
			renderer: Phaser.CANVAS,
			parent: 'canvas',
			resolution: 1,
			antialias: true,
			preserveDrawingBuffer: true
		};

		var game = new Phaser.Game(config), background, avatar, title, bgText, text;

		var Play = function(game){};
		Play.prototype = {
			render: function(){
			},
			preload:function(){
				game.load.image('background', 'images/draw-frame.png');
				game.load.image('avatar', 'images/avatar.jpg');
				game.load.image('bgText', 'images/draw-text-bg.png');
				game.load.image('title', 'images/draw-sing.png');
			},
			create:function(){
				avatar = game.add.sprite(580, 100, 'avatar');

				background = game.add.sprite(0, 0, 'background');
				title = game.add.sprite(260, 73, 'title');
				title.anchor.set(0.5, 0);

				bgText = game.add.sprite(79, 187, 'bgText');
				text = game.add.text(0, 0, 'Bạn dễ bị stress khi mà đầu tháng vung tiền quá đáng, cuối tháng... thích đủ thứ mà ứ có tiền mua. Thiệt là đau lòng quá đi!', {
					fontSize:22,
					font: 'Arial',
					fill: '#fff',
					stroke:'#086e14',
					strokeThickness: 4,
					wordWrap: true,
					wordWrapWidth: bgText.width - PADDING,
					align: 'center'
				});
				text.anchor.set(0.5);
				text.lineSpacing = -6;
				text.resolution = pixelRatio;
			},
			update:function(){
				bgText.height = (text.height / pixelRatio) + PADDING;
				text.x = Math.floor(bgText.x + bgText.width / 2);
				text.y = Math.floor(bgText.y + bgText.height / 2);
			}
		};

		game.state.add('Play', Play);
		game.state.start('Play');
	}

	function getBase64(canvas){
		var output = '';
		// output = canvas.toDataURL({
		// 	format:'jpeg',
		// 	quality:100,
		// 	multiplier:1
		// });
		output = canvas.toDataURL('image/jpeg', 1.0);
		return output;
	}
})();