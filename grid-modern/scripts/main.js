;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = "pinterest",
    defaults = {
    	propertyName: "value"
    };

    // The actual plugin constructor
    function Plugin( element, options ) {
    	this.element = element;
    	this.options = $.extend( {}, defaults, options) ;
    	this._defaults = defaults;
    	this._name = pluginName;
    	this.init();
    }

    Plugin.prototype = {

    	init: function() {
    		this.changeText(this.element, this.options);
    	},

    	changeText: function(el, options) {
            //console.log($(this.element).text(this.options.propertyName));
            console.log(el);
        }
    };

    $.fn[pluginName] = function ( options ) {
    	return this.each(function () {
    		if (!$.data(this, "plugin_" + pluginName)) {
    			$.data(this, "plugin_" + pluginName, new Plugin( this, options ));
    		}
    	});
    };
})( jQuery, window, document );

$(window).load(function() {
	$('.abc').pinterest({
		propertyName: '222222'
	});
});

(function(){
	'use strict';

	var iElement = $('#mod-pinterest'),
	grid = iElement.find('#grid'),
	win = $(window);

	win.load(function() {
		isotopePopup();
		init();
	});

	win.resize(helperJs.debounce(function(){
		stylish();
	},500));

	function preload(callback){
		var loaded = 0;
		var list = grid.find('.thumb');
		var len = list.length;
		if(len){
			for (var i = 0; i < len; i++) {
				var img = new Image();
				img.src = list[i].src;
				img.onload = function(event){
					complete(len);
					console.log('File loaded: ', event.target.currentSrc);
				};

				img.onerror = function(event){
					complete(len);
					console.log('Cannot load file: ', event.target.currentSrc);
				};
			};
		}

		function complete(count){
			loaded++;
			if(loaded === count){
				callback();
			}
		}
	}

	function init(){
		preload(function(){
			setTimeout(function(){
				iElement.css({display:'block',visibility:'visible'});
				stylish();
				iElement.fadeTo(200,1);
			},1000);
		});
	}

	function stylish (){
		if(grid.length > 0) {
			var pinItems = grid.find('.commom-pin-item'),
			containerW = iElement.find('.grid-wrap').width(),
			itemPerRow = parseInt(iElement.attr('pin-column')),
			pinStyle = iElement.attr('pin-style'),
			marginRight = parseInt(iElement.attr('pin-margin-right')),
			marginBottom = parseInt(iElement.attr('pin-margin-bottom')),
			itemCount = pinItems.length,

			winW = win.width();
			if(winW < 769) {
				itemPerRow = 2;
			}
			if(winW < 481) {
				itemPerRow = 1;
			}

			var itemWidth = (containerW - (marginRight * itemPerRow) + marginRight) / itemPerRow,
			width = itemWidth;

			switch(pinStyle){
				case 'float':
				var row = Math.ceil(itemCount / itemPerRow),
				step = -itemPerRow,
				hArr = [];

				for (var i = 0; i < row; i++) {
					step += itemPerRow;

					for (var j = 0; j < itemPerRow; j++) {
						var oldTop,
						oldIdx,
						idx = j + step;

						$(pinItems[idx]).outerWidth(width).css({ top: 0,  left: j * (width + marginRight) });

						if(idx > itemPerRow - 1){
							oldIdx = (idx - itemPerRow);
							oldTop = $(pinItems[oldIdx]).height() + $(pinItems[oldIdx]).position().top + marginBottom;
						}
						else {
							oldTop = 0;
						}

						$(pinItems[idx]).css('top', oldTop);

						/* Set chiều cao cho grid */
						if(i === row - 1){
							/* cacheRow = row - 3; */
							if(pinItems[idx] != undefined) {
								var h = $(pinItems[idx]).height() + $(pinItems[idx]).position().top;
								hArr.push(h);
							}
						}
					};
				};

				grid.height(Math.max.apply(this, hArr));
				break;
				case 'flex':
				var minTop = { column: 0, top: Number.MAX_VALUE, left: Number.MAX_VALUE },
				maxTop = { column: 0, top: Number.MIN_VALUE, left: Number.MIN_VALUE },
				next = [];

				/* Mảng các cột vị trí mà các item sẽ được thêm vào */
				for (var i = 0; i < itemPerRow; i++) {
					next.push({column: i, top: 0, left: i * (width + marginRight)});
				};

				for (var i = 0; i < itemCount; i++) {
					/* Tính vị trí của pinItem hiện tại */
					var minTop = {column: 0, top: Number.MAX_VALUE, left: Number.MAX_VALUE};

					for (var j = 0; j < itemPerRow; j++){
						if(minTop.top >  next[j].top)
							minTop = next[j];
					};

					/* Set width, top, left cho pinItem hiện tại */
					$(pinItems[i]).outerWidth(width).css('top', minTop.top).css('left', minTop.left);

					/* Đưa vị trí mới vào mảng các vị trí */
					next[minTop.column].top += parseInt($(pinItems[i]).css('height')) + marginBottom;

					for (var j = 0; j < itemPerRow; j++){
						if(maxTop.top <  next[j].top)
							maxTop = next[j];
					};
				};

				grid.height(maxTop.top);
				break;
			}
		}
	}

	function isotopePopup(){
		iElement.find('.show-pop').on('click', function(event) {
			var self = $(this).parents('.commom-pin-item');
			var thumb = self.find('.thumb').attr('src');
			var content = self.find('.info-hide').html();
			var title = self.find('.name').text();
			var avatar = self.find('.avatar').attr('src');
			var momName = self.find('strong').text();

			var markup = '<div class="bzPopup" style="max-width:400px">' +
			'<div class="commom-pin-item">' +
			'<div class="inner">' +
			'<div class="pic show-pop">' +
			'<a href="#"><img class="thumb img-responsive center-block" src="'+thumb+'" /></a>' +
			'</div>' +
			'<h2 class="name">'+title+'</h2>' +
			'<div class="info">'+content+'</div>' +
			'<div class="user-info">' +
			'<div class="avatar-wrap">' +
			'<img src="'+avatar+'" class="avatar img-responsive">' +
			'</div>' +
			'<div class="uinfo">' +
			'<span>Chia sẻ từ mẹ</span>' +
			'<strong>'+momName+'</strong>' +
			'</div>' +
			'<div class="clearfix"></div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>';

			helperJs.bzPopup({rel:markup});
			event.preventDefault();
		});
	}
})();