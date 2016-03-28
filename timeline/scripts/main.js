(function(){
    'use strict';

    var mod = document.getElementById('mod-timeline');
    var timeline = document.getElementById('timeline');

    var defCfg = {
        colorWeekend: 'red',
        startDate: new Date(2016, 2, 20),
        endDate: new Date(2016, 4, 10)
    };

    window.onload = function(){
        $.ajax({
            url: 'data/data.json',
            dataType: 'json',
            success: function(resp){
                var data = resp;
                var tlData =  makeTimeline(data, defCfg.startDate, defCfg.endDate);
                timeline.innerHTML = tlData.markup;

                mod.querySelector('.tl-scrollbar').style.width = (tlData.col * 33) + 'px';
                mod.querySelector('.tl-scrollbar-wrap').onscroll = function(){
                    var sleft = this.scrollLeft;
                    mod.querySelector('.date-wrap').style.marginLeft = -sleft + 'px';
                    mod.scrollLeft = sleft;
                };
            }
        });
    };

    function makeTimeline(data, startDate, endDate){
        var tlMarkup = [];
        var days = dayCount(startDate, endDate);

        var rows = data.length;
        var cols = days;

        var _start = new Date(startDate);
        // Tháng

        // Thứ, ngày
        tlMarkup.push('<div class="date-wrap">');
        for (var day = 0; day <= cols; day++) {
            var dateInfo = getDateInfo(_start),
            dayofWeek =_start.getDay(),
            isWeekend = dayofWeek === 6 || dayofWeek === 0,
            weekendClass = isWeekend ? ' class="tl-day tl-weekend" style="color:'+defCfg.colorWeekend+'"' : ' class="tl-day"';

            var m = _start.getMonth();

            tlMarkup.push('<div'+weekendClass+'><span class="dstr">'+dateInfo.dateName+'</span><br><strong class="d">'+dateInfo.date+'</strong></div>');

            _start.setDate(_start.getDate() + 1);
            var a = _start.getMonth();
            if(a > m){
                console.log(a);
            }
        }
        tlMarkup.push('<div class="clearfix"></div></div>');

        tlMarkup.push('<div class="content-wrap">');
        // Thành viên
        for (var mem = 0; mem < rows; mem++) {
            tlMarkup.push('<div class="tl-member-wrap"><div class="tl-member tl-member'+data[mem].group+'"><strong>'+data[mem].name+'</strong></div></div>');

            // Dự án
            for (var pj = 0; pj < data[mem].projects.length; pj++) {
                tlMarkup.push('<div class="tl-project">'+data[mem].projects[pj].name+'</div>');

                // Ngày
                var _start1 = new Date(startDate);
                var dates = data[mem].projects[pj].dates;
                tlMarkup.push('<div class="tl-col-wrap">');
                for (var col = 0; col <= cols; col++) {
                    var color = data[mem].projects[pj].color;
                    var colorChecked = dateContain(_start1, dates) ? ' style="background:'+color+'"' : '';
                    tlMarkup.push('<div class="tl-col tl-col'+data[mem].group+'"><div class="tl-col-inner"'+colorChecked+'></div></div>');
                    _start1.setDate(_start1.getDate() + 1);
                }
                tlMarkup.push('<div class="clearfix"></div></div>');
            }
        }
        tlMarkup.push('<div class="clearfix"></div>');

        return {
            markup: tlMarkup.join(''),
            col: cols
        };
    }

    function dayCount(date1, date2) {
        var oneDay = 1000 * 60 * 60 * 24;
        return Math.round((date2.getTime() - date1.getTime()) / oneDay);
    }

    function dateBetween(date, startDate, endDate) {
        return date >= startDate && date <= endDate;
    }

    function dateContain(date, dateArray) {
        var a = dateArray.filter(function(value){
            return new Date(Date.parse(value)).toDateString() === date.toDateString();
        });
        return a.length !== 0;
    }

    function getDateInfo(date) {
        var dn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        mn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        d = dn[date.getDay()],
        m = mn[date.getMonth()];
        return {
            fullDate: date,
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            dateName: d,
            monthName: m
        }
    }
})();

