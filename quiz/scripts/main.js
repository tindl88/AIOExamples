(function(){
	'use strict';
	angular
	.module('myApp', [])
	.directive('bzQuiz', bzQuiz)
	.controller('homeCtrl', homeCtrl);

	function homeCtrl($scope){
		var home = this;
		home.json = fakeData;
		home.finishQuiz = finishQuiz;

		function finishQuiz(data){
			console.clear();
			console.log(data);
		}
	}

	function bzQuiz($interval){
		return {
			link: function(scope, iElement, iAttrs){
				var answerData = [],
				unAnswerData = [];

				quizCountdown();
				quizRegisterEvents();

	            function quizRegisterEvents(){
		            var endQuiz = iElement.find('.btnEndQuiz');
		            endQuiz.on('click', function(event) {
		            	quizFinish();
		            	event.preventDefault();
		            });
	            }

	            function quizFinish(){
	            	var items = iElement.find('.item'),
	            		className = 'quiz-error';

	            	for (var i = 0; i < items.length; i++) {
	            		var itemChecked = false,
	            		self = $(items[i]),
	            		options = self.find('input[type="radio"]'),
	            		itemKey = self.attr('key'),
	            		itemValue = 0;

	            		$.each(options, function(j, k){
	            			var props = $(k).prop('checked');

	            			if(props){
	            				itemChecked = true;
	            				itemValue = $(k).val() === '' ? 0 : parseInt($(k).val());
	            				if(itemValue !== 1){
	            					self.addClass(className);
	            				} else {
	            					self.removeClass(className);
	            				}
	            			}
	            		});

	            		if(!itemChecked){
	            			unAnswerData.push({
	            				element: items[i]
	            			});
	            			self.addClass(className);
	            		}

            			answerData.push({
            				quest: parseInt(itemKey),
            				answer: itemValue,
            				element: items[i]
            			});
	            	};

	            	scope.home.finishQuiz(answerData);
	            	quizReset();
	            }

	            function quizCountdown(){
	            	var time = parseFloat(iAttrs.bzQuiz) * 60;
	            	var countdown = iElement.find('.countdown');

	            	var timer = $interval(function(){
	            		time--;

	            		if(time < 840){
	            			countdown.css('color', 'green');
	            		}
	            		if(time < 300){
	            			countdown.css('color', 'red');
	            		}
	            		countdown.text(time);

	            		if(time <= 0){
	            			$interval.cancel(timer);
	            			quizFinish();
	            		}
	            	},1000);
	            }


	            function quizReset(){
	            	answerData = [];
	            	unAnswerData = [];
	            }
	        }
	    };
	}
})();
