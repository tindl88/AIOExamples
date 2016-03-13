var fabricJs = (function(){
	'use strict';
	var canvas = new fabric.Canvas('canvas',{backgroundColor: '#ccc'});
	var txtMessage = $('#txtMessage');
	canvas.addImage({unique:'myFrame', url:'images/frame.png', selectable: false, perPixelTargetFind: true});
	canvas.addImage({unique:'myPic', url:'images/pic.jpg'}, function(img){ img.sendToBack(); });
	canvas.addImage({unique:'myBubble', url:'images/bubble.png', originX:'center', originY:'center', scaleX:0.7, scaleY:0.7}, function(img){
		img.sendToBack();
		img.setShadow({color:'rgba(255,0,0,0.7)', blur:6, offsetX:1, offsetY:1});

		var text = canvas.addText({unique: 'myText', inMemory:true, text:txtMessage.val(), fontSize:15, textAlign:'center', originX:'center', originY:'center'});
		text.setShadow({color:'rgba(255,0,0,0.7)', blur:6, offsetX:1, offsetY:1});

		var group = new fabric.Group([img, text], {unique:'myGroup', left:380, top:-10, hasControls:true});
		canvas.add(group);
	});

	txtMessage.on('input', function() {
		var group = canvas.getItemsByUnique('myGroup');
		var text = group[0].item(1).setText($(this).val());
		canvas.renderAll();
	});
})();