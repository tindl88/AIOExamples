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
				var container = iElement.find('#photo-container');
				var editorImage = document.getElementById('editor-image');
				var browseFile = iElement.find('#browseFile');
				var resizer = iElement.find('#resizable');
				var settings = {
					maxWidth: container.width(),
					maxHeight: container.height(),
					padding: 10
				};

				var currentImage = {
					ratio: 1,
					width: 0,
					height: 0,
					x: 0,
					y: 0
				};

				// Phaser variables
				var game, bg;

				scope.pe.crop = crop;
				scope.pe.rotate = rotate;
				scope.pe.filter = filter;

				browseFile.on('change', uploadHandle);

				initPhaser(this);

				function uploadHandle(){
					var reader = new FileReader();
					reader.readAsDataURL(browseFile[0].files[0]);
					reader.onload = function (e) {
						var imageUrl = e.target.result;

						loadImage(imageUrl, function(){
							game.scale.setGameSize(this.width, this.height);
							game.cache.addImage('background', imageUrl, this);
							bg.loadTexture('background', 0, 0);
							resizeImage(this);
							recalc(this);
							initDraggable();
							initResizeable();

							console.log(currentImage);
						});
					}
				}

				function initPhaser(){
					var config = {
						width: 1,
						height: 1,
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
							game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
							game.load.image('background', 'images/blank.png');
							game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Gray.js');
							game.load.script('sepia', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/pixi/SepiaFilter.js');
							game.load.script('noise', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/pixi/NoiseFilter.js');
							game.load.script('colorMatrix', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/pixi/ColorMatrixFilter.js');
						},
						create:function(){
							bg = game.add.sprite(0, 0, 'background');
							bg.anchor.setTo(0, 0);
						},
						update:function(){
						}
					};

					game.state.add('Play', Play);
					game.state.start('Play');
				}

				function resizeImage(imageInst){
					editorImage.src = imageInst.src;
					editorImage.onload = function(){
						if(editorImage.width > settings.maxWidth){
							currentImage.ratio = settings.maxWidth / editorImage.width;
							editorImage.style.maxWidth = editorImage.width * currentImage.ratio;
						} else if(editorImage.height > settings.maxHeight){
							currentImage.ratio = settings.maxHeight / editorImage.height;
							editorImage.style.maxHeight = editorImage.height * currentImage.ratio;
						} else {
							currentImage.ratio = 1;
						}
					};
				}

				function recalc(imageInst){
					currentImage.width = imageInst.width;
					currentImage.height = imageInst.height;
					currentImage.x = imageInst.offsetLeft;
					currentImage.y = imageInst.offsetTop;
				}

				function frame(type){

				}

				function filter(type){
					//bg.tint = Math.random() * 0xffffff;
					//var gray = game.add.filter('Sepia');
					var se = new PIXI.SepiaFilter();
					se.sepia = 0.5;

					var no = new PIXI.NoiseFilter();
					no.noise = 1;

					var colorMatrix =  [
					1,0,0,0.5,
					0,1,0,0.5,
					0,0,1,0.5,
					0,0,0,1
					];

					var colorMatrix =  [
					1,0,0,-0.5,
					0,1,0,-0.5,
					0,0,1,-0.5,
					0,0,0,1
					];
					var co = new PIXI.ColorMatrixFilter();
					co.matrix = colorMatrix;

					bg.filters = [co];
					getBase64();
				}

				function rotate(data){
					if(data.action === 'rotate'){
						bg.anchor.setTo(0.5, 0.5);
						bg.angle = data.param === 'left' ? bg.angle - 90 : bg.angle + 90;

						if(bg.angle === -180 || bg.angle === 0){
							game.scale.setGameSize(currentImage.width, currentImage.height);
							bg.x = currentImage.width / 2;
							bg.y = currentImage.height / 2;

						} else {
							game.scale.setGameSize(currentImage.height, currentImage.width);
							bg.x = currentImage.height / 2;
							bg.y = currentImage.width / 2;
						}
					}

					if(data.action === 'flip'){
						bg.anchor.setTo(0, 0);
						bg.x = 0;
						bg.y = 0;

						if(data.param === 'horizontal'){
							bg.scale.x *= -1;
						} else {
							bg.scale.y *= -1;
						}
					}

					getBase64();
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

				function loadImage(imageUrl, callback){
					var image = new Image();
					image.src = imageUrl;
					image.onload = callback || angular.noop();
					return image;
				}

				function initDraggable(){
					resizer.draggable({containment: '#editor-image', scroll: false});
				}

				function initResizeable(){
					resizer.resizable({containment: '#editor-image', aspectRatio: false})
				}

				function getBase64(){
					$timeout(function(){
						var output = game.canvas.toDataURL('image/jpeg', 1.0);
						$('#editor-image').attr('src', output);
					}, 100);
				}
			}
		};
	}
})();