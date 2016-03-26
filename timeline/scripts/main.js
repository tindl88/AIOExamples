(function(){
    'use strict';

    var mod = $('#mod-timeline');
    var timeline = mod.find('#timeline');

    var members = [{
        id:1,
        name:'Mr A',
        group:'Ac',
        projects:[
        {id:1, name:'DNA', startDate: +new Date(2016, 2, 27) , endDate: new Date(2016, 2, 30), color: 'red'},
        {id:2, name:'PNJ', startDate: new Date(), endDate: new Date(2016, 3, 10), color: 'green'}
        ]
    },{
        id:2,
        name:'Mr B',
        group:'Fe',
        projects:[
        {id:3, name:'Lactum', startDate: new Date(), endDate: new Date(2016, 3, 5), color: 'blue'}
        ]
    }];

    $(document).ready(function() {
        var startDate = new Date();
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 20);
        timeline.html(makeTimeline(startDate, endDate));
    });

    function makeTimeline(startDate, endDate){
        var tlMarkup = [];
        var dayCount = daysBetween(startDate, endDate);

        var rows = members.length;
        var cols = dayCount;

        var _start = new Date(startDate);

        for (var day = 0; day <= cols; day++) {
            tlMarkup.push('<div class="tlDay"><span class="dstr">'+getDateInfo(_start).dateName+'</span><br><span class="d">'+getDateInfo(_start).date+'</span></div>');
            _start.setDate(_start.getDate() + 1);
        }
        tlMarkup.push('<div class="clearfix"></div>');

        for (var row = 0; row < rows; row++) {
            tlMarkup.push('<div class="tlMember tlMember'+members[row].group+'"><strong>'+members[row].name+'</strong></div>');

            for (var project = 0; project < members[row].projects.length; project++) {
                tlMarkup.push('<div class="tlProject">'+members[row].projects[project].name+'('+members[row].projects[project].startDate+''+members[row].projects[project].endDate+')</div>');

                var _start1 = new Date(startDate);
                for (var col = 0; col <= cols; col++) {
                    var checked = dateCheck(_start1, members[row].projects[project].startDate, members[row].projects[project].endDate);
                    var color = members[row].projects[project].color;
                    tlMarkup.push('<div class="tlCol tlCol'+members[row].group+'"'+(checked ? 'style="background:' + color: '')+'"></div>');
                    _start1.setDate(_start1.getDate() + 1);
                }

                tlMarkup.push('<div class="clearfix"></div>');
            }
        }

        return tlMarkup.join('');
    }

    function daysOfMonth(date){
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    function daysBetween(date1, date2) {
        var oneDay = 1000 * 60 * 60 * 24;
        return Math.round((date2.getTime() - date1.getTime()) / oneDay);
    }

    function dateCheck(checkDate, startDate, endDate) {
        return checkDate >= startDate && checkDate <= endDate ? true : false;
    }
    function getDateInfo(date) {
        var b = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        c = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        d = b[date.getDay()],
        e = c[date.getMonth()];
        return {
            fullDate: date,
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            dateName: d,
            monthName: e
        }
    }
})();

