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

				var editorImage = document.getElementById('editor-image');
				var container = iElement.find('#photo-container');
				var resizer = iElement.find('#resizable');

				init('images/test1.jpg');

				scope.pe.init = init;
				scope.pe.crop = crop;

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
					// tính left
					resizer.css({visibility: 'visible'});
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
					};
				}
			}
		};
	}
})();