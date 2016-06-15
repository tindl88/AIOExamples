var bzPhotoEditor = (function(){
	var settings = {
		maxWidth: 767,
		maxHeight: 1023
	};
	var editor = document.getElementById('bzPhotoEditor');
	var editorImage = document.getElementById('editorImage');
	var canvas = new fabric.Canvas('canvas', {backgroundColor: '#ccc'});

	function resizeImage(image){
		var ratio = 1;

		if(image.width > settings.maxWidth){
			ratio = settings.maxWidth / image.width;
			image.style.maxWidth = image.width * ratio;
		}
		else if(image.height > settings.maxHeight){
			ratio = settings.maxHeight / image.height;
			image.style.maxHeight = image.height * ratio;
		}
	}

	function resizeCanvas(imgObject, reverse){
		if(reverse === true){
			canvas.setWidth(imgObject.getHeight());
			canvas.setHeight(imgObject.getWidth());
		} else {
			canvas.setWidth(imgObject.getWidth());
			canvas.setHeight(imgObject.getHeight());
		}
	}

	function filter(type){
		var pic = canvas.getItemsByUnique('mainPic')[0];

		pic.filters = [];

		switch(type){
			case 'Sepia':
			pic.filters.push(new fabric.Image.filters.Sepia());
			break;
			case 'Grayscale':
			pic.filters.push(new fabric.Image.filters.Grayscale());
			break;
			case 'Brightness':
			pic.filters.push(new fabric.Image.filters.Brightness({ brightness: 100 }));
			break;
		}

		pic.applyFilters(function(){
			apply();
			canvas.renderAll.bind(canvas);
		});
	}

	function rotate(type){
		var angle = canvas.item(0).getAngle();

		if(type === 'Left' || type === 'Right'){
			if(angle === 0 || angle === 180 || angle === -180){
				resizeCanvas(canvas.item(0), true);
			} else {
				resizeCanvas(canvas.item(0));
			}
		}

		switch(type){
			case 'Left':
			canvas.item(0).set({angle:(angle === -270 ? 0 : angle - 90), left:canvas.width / 2, top:canvas.height / 2, originX:'center', originY:'center'});
			break;
			case 'Right':
			canvas.item(0).set({angle:(angle === 270 ? 0 : angle + 90), left:canvas.width / 2, top:canvas.height / 2, originX:'center', originY:'center'});
			break;
			case 'FlipH':
			canvas.item(0).toggle('flipX');
			break;
			case 'FlipV':
			canvas.item(0).toggle('flipY');
			break;
		}

		apply();
		canvas.renderAll();
	}
	function crop(type){
		var resizableId = $( "#resizable");
		var widthImg = $("#container-image").width();
		var heightImg = $("#container-image").height();
		if(type == 'Custom'){
			resizableId.css({"display":"block"});
			destroyResizable();
			resizableId.resizable({
		      containment: "#container-image"
		    });
		}
		if(type == '1:1'){
			resizableId.css({"display":"block"});
			destroyResizable();
			resizable();
			var width = (widthImg/2);
			resizableId.css({"width":width, "height":width});
			resizableId.css({top: (heightImg - width)/2,left: (widthImg - width)/2});
		}
		if(type == '16:9'){
			resizableId.css({"display":"block"});
			destroyResizable();
			resizable();
			var width = (widthImg/2)* (16/9);
			var height = (heightImg/2)* (16/9);
			resizableId.css({"width":width, "height":height});
			resizableId.css({top: (heightImg - height)/2,left: (widthImg - width)/2});
		}
		if(type == '4:3'){
			resizableId.css({"display":"block"});
			destroyResizable();
			resizable();
			var width = (widthImg/2)* (4/3);
			var height = (heightImg/2)* (4/3);
			resizableId.css({"width":width, "height":height});
			resizableId.css({top: (heightImg - height)/2,left: (widthImg - width)/2});
		}
	}

	function init(){
		var editorRect = editor.getBoundingClientRect();
		settings.maxWidth = editorRect.width;
		settings.maxHeight = editorRect.height;

		canvas.addImage({unique:'mainPic', url:'images/test.jpg'}, function(img1){
			img1.crossOrigin = "Anonymous";
			resizeCanvas(img1);
			editorImage.src = img1.getSrc();
			editorImage.onload = function(){
				canvas.add(img1);
				resizeImage(editorImage);
			};
		});
	}

	function apply(){
		editorImage.src = canvas.toDataURL();
		setTimeout(resizeImage(editorImage), 200);
	}

	function resizable(){
		var resizableId = $( "#resizable");
		resizableId.resizable({
	      containment: "#container-image",
	      aspectRatio: true
	    });
	}

	function destroyResizable(){
		var resizableId = $( "#resizable");
		resizableId.resizable( "destroy" );
	}

	function draggable(){
		var resizableId = $( "#resizable");
		resizableId.draggable({ containment: "#container-image", scroll: false });
	}

	$(document).ready(function(){
		resizable();
		draggable();
	});
	$(window).load(function(){
		setTimeout(function(){
			var resizableId = $( "#resizable");
			var widthImg = $("#container-image").width();
			var heightImg = $("#container-image").height();
			var width = (widthImg/2);
			resizableId.css({"width":width, "height":width});
			resizableId.css({top: (heightImg - width)/2,left: (widthImg - width)/2});
		});
	});
	return {
		init: init,
		filter: filter,
		rotate: rotate,
		crop: crop,
		resizable: resizable,
		draggable: draggable,
		destroyResizable: destroyResizable
	};
})();

$(function(){
	bzPhotoEditor.init();
});




