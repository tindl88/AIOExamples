$.fn.bzRate = function (options) {
	var defaultVal = {
		select: function(value){}
	};

	var opts = $.extend(defaultVal, options);
	var star = '<span></span><span></span><span></span><span></span><span></span>';
	return this.each(function () {
		var self = $(this);
		var id = $(this).attr('rate-id');
		var value = $(this).attr('rate-value') || 0;
		self.html(star);

		autoActive(value);

		self.find('span').on('mouseenter', function(event) {
			if(self.hasClass('bzrated')) return;
			self.find('span').removeClass('active');
			autoActive($(this).index() + 1);
		});

		self.find('span').on('mouseleave', function(event) {
			if(self.hasClass('bzrated')) return;
			var currentIndex = $(this).index();
			self.find('span').removeClass('active');
			value = self.attr('rate-value') || 0;
			if(value > 0){
				autoActive(value);
			}
		});

		self.find('span').on('click', function(event) {
			if(self.hasClass('bzrated')) return;
			var selectedValue = $(this).index() + 1;
			setValue(selectedValue);
			autoActive(selectedValue);
			if(typeof opts.select === 'function'){
				opts.select(id, selectedValue);
			}
			self.addClass('bzrated');
		});

		function setValue(value){
			self.attr('rate-value', value);
		}

		function autoActive(value){
			self.find('span:lt('+(value)+')').addClass('active');
		}
	});
};