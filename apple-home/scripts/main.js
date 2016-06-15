Array.prototype.getIndexBy = function(name, value) {
	for (var i = 0; i < this.length; i++) {
		if (this[i][name] == value) {
			return i;
		}
	}
	return -1;
};

var json = [
{id:1, name:'Icon 1', isFolder: false},
{id:2, name:'Icon 2', isFolder: false},
{id:3, name:'Icon 3', isFolder: false},
{id:4, name:'Folder 4', isFolder: true},
{id:5, name:'Icon 5', isFolder: false},
{id:6, name:'Folder 6', isFolder: true},
{id:7, name:'Icon 7', isFolder: false},
{id:8, name:'Icon 8', isFolder: false},
{id:9, name:'Icon 9', isFolder: false},
{id:10, name:'Icon 10', isFolder: false},
{id:11, name:'Icon 11', isFolder: false},
{id:12, name:'Icon 12', isFolder: false}
];

var bzSortJs = (function(){
	var selectedItem = {};
	$(document).ready(function() {
		bzSortJs.init();
	});

	function init(){
		generate(4, json);
	}

	function remove(id){
		var idx = json.getIndexBy('id', id);
		var output = json.splice(idx, 1);
		return output[0];
	}

	function addAfter(id, data){
		var idx = json.getIndexBy('id', id);
		json.splice(idx + 1, 0, data);
	}

	function animIn(object, callback){
		TweenMax.to(object, 0.3, {scale:1, width:100, onComplete: callback || $.noop()});
	}

	function animOut(object, callback){
		var tl = new TimelineMax({onComplete: callback || $.noop()});
		tl.to(object, 0.3, {scale:0})
		.to(object, 0.3, {width:0});
	}

	function getJSON(){
		return JSON.stringify(json);
	}

	function generate(maxItem, data, callback){
		var markup = '<div class="sort-list">';

		for (var i = 0; i < json.length; i++) {
			if(i % maxItem === 0 && i > 0){
				markup += '<div class="clearfix"></div></div><div class="sort-list">';
			}
			if(i % 2 === 0){
				markup += '<div class="item'+(json[i].isFolder ? ' folder': '')+'" data-uid="'+json[i].id+'"><span>a</span><div class="inner"><div class="icon"></div><div class="caption text-center"><span>'+json[i].name+'</span></div></div><span>a</span></div>';
			} else {
				markup += '<div class="item'+(json[i].isFolder ? ' folder': '')+'" data-uid="'+json[i].id+'"><div class="inner"><div class="icon"></div><div class="caption text-center"><span>'+json[i].name+'</span></div></div><span>b</span></div>';
			}
		}
		markup += '<div class="clearfix"></div></div><div class="clearfix"></div>';

		$('.sort-viewport').html(markup);

		$(".item").off();

		$(".item").draggable({
			start: function( event, ui ) {
				var idx = json.getIndexBy('id', parseInt(ui.helper.data().uid));
				selectedItem.index = idx;
				selectedItem.position = ui.offset;
			},
			stop: function( event, ui ) {
			}
		});

		var a = 0;
		$(".item").droppable({
			drop: function(event, ui) {
				var isTargetFolder = $(event.target).hasClass('folder');
				var isDragFolder = ui.draggable.hasClass('folder');

				if(isDragFolder){
					console.log('Không thể kéo thả thư mục');
				} else {
					var id = parseInt(ui.draggable.data().uid);

					if(isTargetFolder){
						remove(id);
						init();
					} else {
						//var selItem = remove(id);
						//var idx = json.getIndexBy('id', id);
						//addAfter(id, selItem);
						init();
					}

				}
			},
			deactivate: function( event, ui ) {
				TweenMax.to(ui.draggable, 0.5, {left:0, top:0});
			}
		});

		$('#txtJson').text(getJSON());

		$('button').on('click', function(event) {
			var id = parseInt($('.item').eq(0).data().uid);
			var a = remove(id);
			addAfter(4, a);
			init();
		});
	}

	return {
		init: init
	};
})();