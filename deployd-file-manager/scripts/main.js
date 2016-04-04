(function(){
	'use strict';

	$('#btnSubmitFile').on('click', save);

	$('#btnClear').on('click', clear);

	list();
})();

function save(){
	var count = 0;
	var files = $('#file')[0].files;

	for (var i = 0; i < files.length; i++) {
		dpdJs.save(files[i]).then(function(resp){
			count++;

			$('#file-manager-progressbar .f-progress-bar').css('width', ((count * 100) / files.length) + '%');

			if(count === files.length){
				list();
				console.log('Upload thành công!');
			}
		});
	}
}

function list(){
	dpdJs.list().then(function(resp){
		var markup = [];

		$('#filelists').empty();

		if(resp.length){
			for (var i = 0; i < resp.length; i++) {
				markup.push('<div><span>'+resp[i].originalFilename+'</span><button onclick="removeItem(\''+resp[i].id+'\')">Remove</button></div>')
				if(i === resp.length - 1){
					$('#filelists').html(markup.join(''));
					console.log('list');
				}
			}
		}
	});
}

function removeItem(id){
	dpdJs.remove(id).then(function(resp){
		console.log('Xóa thành công!', resp);
		list();
	});
}

function clear(){
	var count = 0;

	dpdJs.list().then(function(resp){
		if(resp.length){
			for (var i = 0; i < resp.length; i++) {
				dpdJs.remove(resp[i].id).then(function(res){
					count++;
					if(count === resp.length){
						console.log('Xóa thành công!');
						list();
					}
				});
			}
		}
	});
}