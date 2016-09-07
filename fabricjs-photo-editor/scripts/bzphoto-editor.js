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
				var container = document.getElementById('photo-container');
				var browseFile = iElement.find('#browseFile');
				var resizer = iElement.find('#resizable');
				var editorImage = document.getElementById('editor-image');
				var settings = {
					maxWidth: container.clientWidth,
					maxHeight: container.clientHeight,
					padding: 10
				};

				var currentImage = {
					ratio: 1,
					origWidth: 0,
					origHeight: 0,
					width: 0,
					height: 0,
					x: 0,
					y: 0
				};

				// Phaser variables
				var game, bg;

				scope.pe.crop = crop;
				scope.pe.doCrop = doCrop;
				scope.pe.rotate = rotate;
				scope.pe.filter = filter;
				scope.pe.save = save;

				browseFile.on('change', uploadHandle);

				initPhaser(this);

				function uploadHandle(){
					var reader = new FileReader();
					reader.readAsDataURL(browseFile[0].files[0]);


					reader.onload = function (e) {
						var imgBase64 = e.target.result;
						editorImage.src = imgBase64;
						editorImage.onload = function(){
							game.scale.setGameSize(editorImage.width, editorImage.height);
							game.cache.addImage('background', imgBase64, editorImage);
							bg.loadTexture('background', 0, 0);

							resizeImage(editorImage, function(){
							});

							initDragAndResize();
						};
					};
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
							game.load.script('gray', 'scripts/filters/Gray.js');
							game.load.script('sepia', 'scripts/filters/pixi/SepiaFilter.js');
							game.load.script('noise', 'scripts/filters/pixi/NoiseFilter.js');
							game.load.script('colorMatrix', 'scripts/filters/pixi/ColorMatrixFilter.js');
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

				function resizeImage(img, callback) {
					img.removeAttribute('style');

					var srcWidth = img.width;
					var srcHeight = img.height;

					var resizeWidth = srcWidth;
					var resizeHeight = srcHeight;

					var ratio = resizeWidth / resizeHeight;

					if (resizeWidth > settings.maxWidth) {
						resizeWidth = settings.maxWidth;
						resizeHeight = resizeWidth / ratio;
					}

					if (resizeHeight > settings.maxHeight) {
						ratio = resizeWidth / resizeHeight;
						resizeHeight = settings.maxHeight;
						resizeWidth = resizeHeight * ratio;
					}

					img.style.maxWidth = resizeWidth;
					img.style.maxHeight = resizeHeight;

					// Current image
					currentImage.ratio = ratio;

					if(typeof callback === 'function'){
						callback();
					}
				}

				function frame(type){

				}

				function filter(data){
					var filter;
					bg.filters = null;

					switch(data.param){
						case 'sepia':
						filter = new PIXI.SepiaFilter();
						filter.sepia = data.value;
						break;
						case 'gray':
						filter = game.add.filter('Gray');
						break;
						case 'brightness':
						var colorMatrix =  [
						1, 0, 0, 0, 0,
						0, 1, 0, 0, 0,
						0, 0, 1, 0, 0,
						0, 0, 0, 1, 0
						];
						filter = new PIXI.ColorMatrixFilter();
						//filter.matrix = colorMatrix;
						filter.brightness = 1.5;
						break;
						case 'noise':
						filter = new PIXI.NoiseFilter();
						filter.noise = data.value;
						break;
						case 'tint':
						bg.tint = Math.random() * 0xffffff;
						break;
						case 'hue':
						console.log(new PIXI.filters.ColorMatrixFilter())
						break;
					}

					if(data.param !== 'tint'){
						bg.tint = 0xffffff;
						bg.filters = [filter];
					}

					getBase64();
				}

				function rotate(data){
					var angle = bg.angle;

					if(data.action === 'rotate'){
						bg.anchor.setTo(0.5, 0.5);
						bg.angle = data.param === 'left' ? angle - 90 : angle + 90;
						if(angle === -180 || angle === 0){
							game.scale.setGameSize(bg.texture.height, bg.texture.width);
							bg.x = bg.texture.height / 2;
							bg.y = bg.texture.width / 2;
						} else {
							game.scale.setGameSize(bg.texture.width, bg.texture.height);
							bg.x = bg.texture.width / 2;
							bg.y = bg.texture.height / 2;
						}
					}

					if(data.action === 'flip'){
						bg.anchor.setTo(0.5, 0.5);
						if(angle === -180 || angle === 0){
							bg.x = bg.texture.width / 2;
							bg.y = bg.texture.height / 2;
						} else {
							bg.x = bg.texture.height / 2;
							bg.y = bg.texture.width / 2;
						}

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
						var size = (editorImage.width / 1) * 1;
						resizer
						.css({
							left: editorImage.offsetLeft + settings.padding,
							top: editorImage.offsetTop + settings.padding,
							width: editorImage.width - (settings.padding * 2),
							height: editorImage.height - (settings.padding * 2)
						})
						.data('uiResizable')._aspectRatio = false;
						break;
						case '1:1':
						var w = (editorImage.width > editorImage.height ? editorImage.height : editorImage.width);
						var size = (w / 1) * 1;
						resizer
						.css({
							left: (editorImage.offsetLeft + ((editorImage.width) / 2)) - (size / 2),
							top: (editorImage.offsetTop + ((editorImage.height) / 2)) - (size / 2),
							width: w,
							height: size
						})
						.data('uiResizable')._aspectRatio = true;
						break;
						case '16:9':
						var w = (editorImage.width > editorImage.height ? editorImage.height : editorImage.width);
						var size = (w / 16) * 9;
						resizer
						.css({
							left: (editorImage.offsetLeft + (editorImage.width) / 2) - (w / 2),
							top: (editorImage.offsetTop + ((editorImage.height) / 2)) - (size / 2),
							width: w,
							height: size
						})
						.data('uiResizable')._aspectRatio = true;
						break;
						case '4:3':
						var w = (editorImage.width > editorImage.height ? editorImage.height : editorImage.width);
						var size = (w / 4) * 3;
						resizer
						.css({
							left: (editorImage.offsetLeft + (editorImage.width) / 2) - (w / 2),
							top: (editorImage.offsetTop + ((editorImage.height) / 2)) - (size / 2),
							width: w,
							height: size
						})
						.data('uiResizable')._aspectRatio = true;
						break;
					}

					resizer.css({visibility: 'visible'});
				}

				function doCrop(){

				}

				var cropStep = 0;
				function save() {
					switch(scope.pe.command){
						case 'crop':
						if(cropStep > 2) return;
						cropStep++;

						if(cropStep === 1){
							var rect = resizer[0].getBoundingClientRect();
							var cropRect = new Phaser.Rectangle(0, 0, rect.width, rect.height);
							bg.crop(cropRect);
							game.scale.setGameSize(rect.width, rect.height);
							getBase64();
						}

						if(cropStep === 2){
							scope.pe.command = 'editor';
						}
						console.log(cropStep);
						break;
						case 'rotate':
						alert('rotate')
						break;
						case 'filter':
						alert('filter')
						break;
						case 'frame':
						alert('frame')
						break;
					}
				}

				function initDragAndResize(){
					resizer
					.removeAttr('style')
					.draggable({containment: '#editor-image', scroll: false})
					.resizable({containment: '#editor-image', aspectRatio: false});
				}

				function getBase64(){
					$timeout(function(){
						var imgBase64 = game.canvas.toDataURL();
						editorImage.src = imgBase64;
						editorImage.onload = function(){
							resizeImage(editorImage);
						};
					}, 200);
				}
			}
		};
	}
})();