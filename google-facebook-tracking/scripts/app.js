(function(){
	'use strict';

	angular
	.module('myApp', ['angular-google-analytics'])
	.config(config)
	.controller('homeCtrl', homeCtrl);

	function config(AnalyticsProvider){
		AnalyticsProvider.setAccount([{ tracker: 'UA-77928470-1', name: 'tracker1', trackEvent: true }]);
	}

	function homeCtrl($scope, $window, Analytics){
		var home = this;
		home.register = register;

		Analytics.trackPage('/', 'Đăng ký');

		// Google remaketing (Async)
		$window.google_trackConversion({
			google_conversion_id: 1006760383,
			google_custom_params: window.google_tag_params,
			google_remarketing_only: true
		});

		function register(){
			Analytics.trackPage('/dang-ky-thanh-cong', 'Đăng ký thành công!');

			// Facebook Pixel Code
			fbq('track', 'CompleteRegistration');

			// Google conversion (Async)
			$window.google_trackConversion({
				google_conversion_id: 1006760383,
				google_conversion_language: "en",
				google_conversion_format: "3",
				google_conversion_color: "ffffff",
				google_conversion_label: "wesWCJ2I6GYQv-OH4AM",
				google_remarketing_only: false
			});
		}
	}
})();