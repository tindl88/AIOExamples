(function(){
	'use strict';
	var canvas = new fabric.Canvas('canvas', {backgroundColor: '#ccc'});
	var txtMessage = $('#txtMessage');
	var btnSubmitFile = $('#btnSubmitFile');
	var btnSubmitBase64 = $('#btnSubmitBase64');
	var btnClear = $('#btnClear');
	var baseURL = 'http://128.199.227.141:3001/';

	canvas.addImage({unique:'mainPic', url:'images/test.jpg', selectable: false, perPixelTargetFind: false}, function(img1){
		canvas.add(img1);
		canvas.centerObject(img1);
		console.log(canvas);
	});

	$(document).ready(function() {
		txtMessage.on('input', function() {
			var myGroup = canvas.getItemsByUnique('myGroup');
			var text = myGroup[0].item(1).setText($(this).val());
			canvas.renderAll();
		});

		btnSubmitFile.on('click', function(event) {
			save('file');
		});

		btnSubmitBase64.on('click', function(event) {
			save('base64');
		});

		btnClear.on('click', function(event) {
			clear();
		});
	});

	function save(dataType){
		var ext = 'jpg';
		var fd = new FormData();

		switch(dataType){
			case 'base64':
			var base64 = canvas.toDataURL({format: ext});
			var blob = helperJs.convertBase64ToBlob(base64);
			fd.append('uploadFile', blob, helperJs.generateRandomString(7) + '.' + ext);
			process();
			break;
			case 'file':
			var file = $('#file')[0].files[0];
			fd.append("uploadFile", file);
			process();
			break;
		}

		function process(){
			$.ajax({
				method: 'POST',
				url: baseURL + 'fileupload/',
				data: fd,
				contentType: false,
				processData: false
			})
			.success(function(resp){
				alert('upload thành công!');
			});
		}
	}

	function clear(){
		$.ajax({
			method: 'GET',
			url: baseURL + 'fileupload/',
			contentType: 'json'
		})
		.success(function(resp){
			for (var i = 0; i < resp.length; i++) {
				var id = resp[i].id;

				$.ajax({
					method: 'DELETE',
					url: baseURL + 'fileupload/' + id
				});
			}
			alert('Xóa thành công!');
		});
	}
})();