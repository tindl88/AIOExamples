(function(){
    'use strict';

    var mod = document.getElementById('mod-timeline');
    var timeline = document.getElementById('timeline');

    var defCfg = {
        columnWidth: 33,
        startDate: new Date(2016, 2, 20),
        endDate: new Date(2016, 4, 31)
    };

    window.onload = function(){
        $.ajax({
            url: 'data/data.json',
            dataType: 'json',
            success: function(resp){
                var data = resp;
                var tlData =  makeTimeline(data, defCfg.startDate, defCfg.endDate);
                timeline.querySelector('.tl-data').innerHTML = tlData.timeline;
                timeline.querySelector('#tl-group').innerHTML = tlData.group;
                timeline.querySelector('#tl-month').innerHTML = tlData.month;
            }
        });
    };

    function makeTimeline(data, startDate, endDate){
        var tlMarkup = [],
        tlGroup = [],
        tlMonth = [],
        days = helperJs.dayCount(startDate, endDate),
        rows = data.length,
        cols = days,
        now = new Date(),
        _start = new Date(startDate);

        // Tháng, Thứ, ngày
        tlMarkup.push('<div class="date-wrap">');
        var _c = 0;
        for (var day = 0; day <= cols; day++) {
            var dateInfo = helperJs.getDateInfo(_start),
            dayofWeek =_start.getDay(),
            weekendClass = dayofWeek === 6 || dayofWeek === 0 ? ' tl-weekend': '',
            todayClass = _start.toDateString() === now.toDateString() ? ' tl-today' : '';

            if(_start.getDate() === 1){
                tlMonth.push('<div class="tl-month-name" style="width:'+(_c * defCfg.columnWidth)+'px"><span>Tháng '+_start.getMonth()+'</span></div>');
                _c = 0;
            }
            _c++;
            tlMarkup.push('<div class="tl-day'+weekendClass+todayClass+'"><span class="dstr">'+dateInfo.dateName+'</span><br><strong class="d">'+dateInfo.date+'</strong></div>');
            _start.setDate(_start.getDate() + 1);
        }
        tlMonth.push('<div class="clearfix"></div>');
        tlMarkup.push('<div class="clearfix"></div></div>');
        tlMarkup.push('<div class="content-wrap">');
        // Thành viên
        tlMarkup.push('<div class="content-wrap">');
        for (var mem = 0; mem < rows; mem++) {
            var memberData = data[mem];
            tlGroup.push('<div class="tl-member tl-member'+memberData.group+'"><strong>'+memberData.name+'</strong></div>');
            tlMarkup.push('<div class="tl-member-in"><strong>'+memberData.name+'</strong></div>');
            // Dự án
            for (var pj = 0; pj < data[mem].projects.length; pj++) {
                var projectData = data[mem].projects[pj];
                tlGroup.push('<div class="tl-project-name"><span>'+projectData.name+'</span></div>');
                // Ngày
                var _start1 = new Date(startDate);
                tlMarkup.push('<div class="tl-col-wrap">');
                for (var col = 0; col <= cols; col++) {
                    var checked = helperJs.dateContain(_start1, projectData.dates),
                    colorChecked = checked ? ' style="background:'+projectData.color+'"' : '';
                    //var checked = helperJs.dateBetween(_start1, new Date(projectData.startDate), new Date(projectData.endDate)),
                    //colorChecked = checked ? ' style="background:'+projectData.color+'"' : '';
                    tlMarkup.push('<div class="tl-col tl-col'+data[mem].group+'"><div class="tl-col-inner"'+colorChecked+'></div></div>');
                    _start1.setDate(_start1.getDate() + 1);
                }
                tlMarkup.push('<div class="clearfix"></div></div>');
            }
            tlMarkup.push('<div class="clearfix"></div>');
        }
        tlMarkup.push('<div class="clearfix"></div>');

        return {
            timeline: tlMarkup.join(''),
            group: tlGroup.join(''),
            month: tlMonth.join(''),
            col: cols + 1
        };
    }
})();

