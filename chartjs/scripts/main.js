var chartJs = (function(){
	'use strict';

	var jsonData;
	var ctx = document.getElementById('myChart');
	var currentPage = 1;
	var itemPerPage = 10;


	loadData();

	function loadData(){
		$.ajax({
			method: 'GET',
			url: 'data/who.json',
			dataType: 'json',
			success: function(resp){
				jsonData = resp;
				drawChart(jsonData, currentPage);
			}
		});
	}

	function drawChart(allData, page){
		var boyH = allData.height_boy;
		var startIndex = (page * itemPerPage) - itemPerPage;
		var endIndex = page * itemPerPage;

		var chartParams = {
			labels: [],
			datasets: [{
				label: 'Height',
				data: [],
				pointBackgroundColor: 'red',
				borderColor:'red',
				borderWidth: 2
			}]
		};
		for (var i = startIndex; i < endIndex; i++) {
			chartParams.labels.push(''+boyH[i].month);
			chartParams.datasets[0].data.push(parseFloat(boyH[i].normal));
		}

		var myChart = new Chart(ctx, {
			type: 'line',
			data: chartParams,
			options: {
				animation: false,
				legend: {
					display: false
				},
				responsive: false,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
	}

	function changePage(page){
		currentPage += page;
		if(currentPage < 1) currentPage = 1;
		if(currentPage > 6) currentPage = 6;
		console.log(currentPage);
		drawChart(jsonData, currentPage);
	}

	return {
		changePage: changePage
	};
})();
