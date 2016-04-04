var rateJs = (function(){
	'use strict';

	$(document).ready(function() {
		rate();
	});

	function rate(){
		$('.rator').not('.bzrated').bzRate({
			select: function(id, value){
				console.log('Call ajax', id, value);
			}
		});
	}


	function add(){
		$('#mod-rate').append('<div class="rator" rate-id="1" rate-value="3"></div><div class="rator" rate-id="1" rate-value="4"></div><div class="rator" rate-id="1" rate-value="5"></div><div class="rator" rate-id="1" rate-value="5"></div>');
		rateJs.rate();
	}

	return {
		rate: rate,
		add: add
	};
})();

