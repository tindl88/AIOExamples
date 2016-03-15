(function(){
	'use strict';
	var pixelRatio = window.devicePixelRatio;
	var config = {
		width: 1200,
		height: 630,
		renderer: Phaser.CANVAS,
		parent: 'canvas',
		resolution: pixelRatio
	};
	var PADDING = 20, bg, avatar, bgTrans1, bgTrans2, wswd, dynamicTitle, text1, text2, game = new Phaser.Game(config);
	game.preserveDrawingBuffer = true;

	var Play = function(game){};
	Play.prototype = {
		preload:function(){
			game.load.image('bg', 'images/draw-frame.png');
			game.load.image('avatar', 'images/avatar.png');
			game.load.image('trans1', 'images/draw-trans1.png');
			game.load.image('trans2', 'images/draw-trans2.png');
			game.load.image('wswd', 'images/draw-wswd.png');
			game.load.image('titleMoney', 'images/draw-money.png');
			game.load.image('titleSerious', 'images/draw-serious.png');
			game.load.image('titleSing', 'images/draw-sing.png');
		},
		create:function(){
			avatar = game.add.sprite(580, 100, 'avatar');

			bg = game.add.sprite(0, 0, 'bg');

			dynamicTitle = game.add.sprite(260, 73, 'titleSing');
			dynamicTitle.anchor.set(0.5, 0);
			bgTrans1 = game.add.sprite(79, 187, 'trans1');

			wswd = game.add.sprite(174, 351, 'wswd');
			bgTrans2 = game.add.sprite(54, 398, 'trans2');

			text1 = game.add.text(0, 0, 'Bạn dễ bị stress khi mà đầu tháng vung tiền quá đáng, cuối tháng... thích đủ thứ mà ứ có tiền mua. Thiệt là đau lòng quá đi!', {
				fontSize:22,
				font: 'Arial',
				fill: '#fff',
				stroke:'#086e14',
				strokeThickness: 4,
				wordWrap: true,
				wordWrapWidth: bgTrans1.width - PADDING,
				align: 'center'
			});
			text1.anchor.set(0.5);
			text1.lineSpacing = -6;

			text2 = game.add.text(0, 0, 'Bình tĩnh! Thật ra chỉ còn 5 ngày nữa là thứ Bảy rồi. Lạc quan lên, bạn sẽ thấy stress 0 là gì!', {
				fontSize:16,
				font: 'Arial',
				fill: '#fff',
				stroke:'#086e14',
				strokeThickness: 4,
				wordWrap: true,
				wordWrapWidth: bgTrans2.width - PADDING,
				align: 'center'
			});
			text2.anchor.set(0.5);
			text2.lineSpacing = -6;
		},
		update:function(){
			bgTrans1.height = (text1.height / pixelRatio) + PADDING;
			text1.x = Math.floor(bgTrans1.x + bgTrans1.width / 2);
			text1.y = Math.floor(bgTrans1.y + bgTrans1.height / 2);

			bgTrans2.height = (text2.height / pixelRatio) + PADDING;
			text2.x = Math.floor(bgTrans2.x + bgTrans2.width / 2);
			text2.y = Math.floor(bgTrans2.y + bgTrans2.height / 2);
		}
	};

	game.state.add('Play', Play);
	game.state.start('Play');
})();