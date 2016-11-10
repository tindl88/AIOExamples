(function(){
	'use strict';
	var canvas = new fabric.Canvas('canvas', {backgroundColor: '#ccc'});

	// Chèn overlay
	canvas.setOverlayImage('images/frame.png', canvas.renderAll.bind(canvas));

	// Chèn hình ở dưới
	fabric.Image.fromURL('images/pic.jpg', function (oImg) {
		canvas.add(oImg);
	}, {});

})();