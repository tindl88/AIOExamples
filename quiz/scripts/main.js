(function() {
  'use strict';

  angular
  .module('myApp', ['ngSanitize'])
  .directive('bzQuiz', bzQuiz)
  .controller('homeCtrl', homeCtrl);

  function homeCtrl($scope) {
    var home = this;
    home.json = fakeData;
  }

  function bzQuiz($interval) {
    return {
      link: function(scope, iElm, iAttrs) {
        var quizData = scope.home.json;
        scope.quizFinish = quizFinish;
        scope.quizSelect = quizSelect;

        initAnswerData();
        quizCountdown();

        function initAnswerData() {
          scope.answerData = {
            all: [],
            correct: [],
            inCorrect: [],
            hasAnswer: [],
            notAnswer: []
          };
        }

        function quizFinish() {
          //Trả lời đúng
          scope.answerData.correct = scope.answerData.all.filter(item => item.correct === 1);
          //Trả lời sai
          scope.answerData.inCorrect = scope.answerData.all.filter(item => item.correct === 0);
          //Chưa trả lời
		  scope.answerData.hasAnswer = [];
		  scope.answerData.notAnswer = [];
          for (var i = 0; i < quizData.questions.length; i++) {
            var q = quizData.questions[i];
            var b = {id: q.id};
            if (q.selected === 1) {
              scope.answerData.hasAnswer.push(b);
            } else {
              scope.answerData.notAnswer.push(b);
            }
          }
        }

        function quizSelect(question, answer) {
          question.selected = 1;

          var qExist = _.findIndex(scope.answerData.all, function(item) {
            return item.id === question.id;
          });

          if (qExist !== -1) {
            scope.answerData.all[qExist].answer = answer.id;
            scope.answerData.all[qExist].correct = answer.correct;
          } else {
            scope.answerData.all.push({id: question.id, answer: answer.id, correct: answer.correct});
          }
        }

        function quizCountdown() {
          var time = parseFloat(iAttrs.bzQuiz) * 60;
          var countdown = iElm.find('.countdown');
          countdown.text(time);

          var timer = $interval(
            function() {
              time--;

              if (time < 840) {
                countdown.css('color', 'green');
              }
              if (time < 300) {
                countdown.css('color', 'red');
              }
              countdown.text(time);

              if (time <= 0) {
                $interval.cancel(timer);
                quizFinish();
              }
            },
            1000
          );
        }
      }
    };
  }
})();
