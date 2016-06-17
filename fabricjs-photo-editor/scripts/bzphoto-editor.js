(function(){
	'use strict';
	angular
	.module('bzApp', [])
	.controller('photoEditorCtrl', photoEditorCtrl)
	.directive('photoEditor', photoEditor);

	function photoEditorCtrl($scope){
		var pe = this;
		pe.command = 'editor';
		pe.active = '';

		pe.sendCommand = sendCommand;

		function sendCommand(cmd){
			if(pe.command === 'crop'){

			} else {
				console.log('Send:', cmd);
			}
		}
	}

	function photoEditor($timeout){
		return {
			link: function(scope, iElement, iAttrs){
				var editorImage = document.getElementById('editor-image');
				var container = iElement.find('#photo-container');
				var resizer = iElement.find('#resizable');

				var settings = {
					maxWidth: 767,
					maxHeight: 1023,
					padding: 10
				};

				var currentImage = {
					ratio: 1,
					width: 0,
					height: 0,
					x: 0,
					y: 0
				};

				var game, bg, bgRotate = 0;

				scope.pe.init = init;
				scope.pe.crop = crop;
				scope.pe.rotate = rotate;

				init('images/test1.jpg');

				function resizeImage(image){
					if(image.width > settings.maxWidth){
						currentImage.ratio = settings.maxWidth / image.width;
						image.style.maxWidth = image.width * currentImage.ratio;
					} else if(image.height > settings.maxHeight){
						currentImage.ratio = settings.maxHeight / image.height;
						image.style.maxHeight = image.height * currentImage.ratio;
					} else {
						currentImage.ratio = 1;
					}

					currentImage.width = image.width;
					currentImage.height = image.height;
					currentImage.x = image.offsetLeft;
					currentImage.y = image.offsetTop;
				}

				function filter(type){

				}

				function rotate(type){

				}

				function crop(type){

					switch(type){
						case 'custom':
						var size = (currentImage.width / 1) * 1;
						resizer
						.css({
							left: currentImage.x + settings.padding,
							top: currentImage.y + settings.padding,
							width: currentImage.width - (settings.padding * 2),
							height: currentImage.height - (settings.padding * 2)
						})
						.data('uiResizable')._aspectRatio = false;
						break;
						case '1:1':
						var w = (currentImage.width > currentImage.height ? currentImage.height : currentImage.width);
						var size = (w / 1) * 1;
						resizer
						.css({
							left: (currentImage.x + ((currentImage.width) / 2)) - (size / 2),
							top: (currentImage.y + ((currentImage.height) / 2)) - (size / 2),
							width: w,
							height: size
						})
						.data('uiResizable')._aspectRatio = true;
						break;
						case '16:9':
						var w = (currentImage.width > currentImage.height ? currentImage.height : currentImage.width);
						var size = (w / 16) * 9;
						resizer
						.css({
							left: (currentImage.x + (currentImage.width) / 2) - (w / 2),
							top: (currentImage.y + ((currentImage.height) / 2)) - (size / 2),
							width: w,
							height: size
						})
						.data('uiResizable')._aspectRatio = true;
						break;
						case '4:3':
						var w = (currentImage.width > currentImage.height ? currentImage.height : currentImage.width);
						var size = (w / 4) * 3;
						resizer
						.css({
							left: (currentImage.x + (currentImage.width) / 2) - (w / 2),
							top: (currentImage.y + ((currentImage.height) / 2)) - (size / 2),
							width: w,
							height: size
						})
						.data('uiResizable')._aspectRatio = true;
						break;
					}

					resizer.css({visibility: 'visible'});
				}

				function rotate(){
					// bgRotate += 90;
					// game.width = 125;
					// game.height = 200;
					// game.canvas.width = 125;
					// game.canvas.height = 200;
					// $('canvas').css({width:125, height:200});
					var output = game.canvas.toDataURL('image/jpeg', 1.0);
					//init(output);
					$('#editor-image').attr('src', output);
				}

				function init(imgUrl){
					var editorRect = container[0].getBoundingClientRect();
					settings.maxWidth = editorRect.width;
					settings.maxHeight = editorRect.height;

					editorImage.src = imgUrl;
					editorImage.onload = function(){
						resizeImage(editorImage);

						resizer
						.resizable({containment: '#editor-image', aspectRatio: false})
						.draggable({containment: '#editor-image', scroll: false});

						var config = {
							width: currentImage.width,
							height: currentImage.height,
							renderer: Phaser.AUTO,
							parent: 'canvas',
							resolution: 1,
							preserveDrawingBuffer: true
						};
						game = new Phaser.Game(config);
						var Play = function(game){};

						Play.prototype = {
							render: function(){
							},
							preload:function(){
								game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
								game.load.image('background', 'images/test1.jpg');
							},
							create:function(){
								bg = game.add.sprite(0, 0, 'background');
								bg.anchor.setTo(0.5, 0.5);
								bg.x = bg.width / 2;
								bg.y = bg.height / 2;
							},
							update:function(){
								bg.angle = bgRotate;
							}
						};

						game.state.add('Play', Play);
						game.state.start('Play');
					};
				}
			}
		};
	}
})();