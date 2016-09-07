(function(){
	'use strict';

	var image = new Image();
	var image1 = new Image();
	var image2 =  new Image();
	var image3 =  new Image();
	var image4 =  new Image();
	image.src = 'images/demo.png';
	image1.src = 'images/mirror1.svg';
	image2.src = 'images/mirror2.svg';
	image3.src = 'images/mirror3.svg';
	image4.src = 'images/mirror4.svg';
	var ctx = $('#canvas').get(0).getContext('2d');
	var ctx1 = $('#canvas1').get(0).getContext('2d');
	var ctx2 = $('#canvas2').get(0).getContext('2d');
	var ctx3 = $('#canvas3').get(0).getContext('2d');
	var point = {x:-300, y:-230};
	var point1 = {x:-700, y:-300};
	var point2 = {x:-400, y:-200};
	var Array1 = [-100,-200,-230,-300,-350,-420,-490,-510];
	var ranArray1 = parseInt(Math.random()*8);
	var posArray1 = Array1[ranArray1];
	var Array2 = [0,-100];
	var ranArray2 = parseInt(Math.random()*2);
	var posArray2 = Array1[ranArray2];
	var Array3 = [-300,-350,-420,-490,-510,-520,-550,-560,-600];
	var ranArray3 = parseInt(Math.random()*3);
	var posArray3 = Array3[ranArray3];

	events();

	function events(){
		$('#btnLoad').on('click', function(event) {
			event.preventDefault();
			run();
		});
	}

	function drawImage1(context, rotate, imageLeft, imageTop){
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.save();
		context.drawImage(image1, 0, 0);
		context.globalCompositeOperation = 'source-atop';
		context.drawImage(image, imageLeft, imageTop);
		context.restore();
	}

	function drawImage2(context, rotate, imageLeft, imageTop){
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.save();
		context.drawImage(image2, 0, 0);
		context.globalCompositeOperation = 'source-atop';
		context.drawImage(image, imageLeft, imageTop);
		context.restore();
	}

	function drawImage3(context, rotate, imageLeft, imageTop){
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.save();
		context.drawImage(image3, 0, 0);
		context.globalCompositeOperation = 'source-atop';
		context.drawImage(image, imageLeft, imageTop);
		context.restore();
	}

	function drawImage4(context,imageLeft, imageTop){
		context.drawImage(image4, 0, 0);
	}

	function run(){
		var duration = 4;
		TweenMax.to(point, duration, {x:posArray1,ease:Back.easeOut, delay:0.8, onUpdate: function () {
			drawImage1(ctx, 0, point.x, point.y);
		}});

		TweenMax.to(point1, duration, {x:posArray1,ease:Back.easeOut, y:-200, delay:0.6, onUpdate: function () {
			drawImage2(ctx1, 0, point1.x, point1.y);
		}});

		TweenMax.to(point2, duration, {x:posArray3,ease:Back.easeOut, y:-150, delay:0.4, onUpdate: function () {
			drawImage3(ctx2, 0, point2.x, point2.y);
		}});

		drawImage4(ctx3, 0, 0);
	}
})();