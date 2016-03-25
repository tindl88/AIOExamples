(function(){
    'use strict';

    var mod = $('#mod-timeline');
    var timeline = mod.find('#timeline');

    var members = [{
        id:1,
        name:'Mr A',
        group:'Ac',
        projects:[
            {id:1, name:'DNA', startDate: new Date(2016, 2, 26), endDate: new Date(2016, 2, 28), color: 'red'},
            {id:2, name:'PNJ', startDate: new Date(2016, 2, 26), endDate: new Date(2016, 3, 10), color: 'green'}
        ]
    },{
        id:2,
        name:'Mr B',
        group:'Fe',
        projects:[
            {id:3, name:'Lactum', startDate: new Date(2016, 2, 26), endDate: new Date(2016, 3, 5), color: 'blue'}
        ]
    }];

    $(document).ready(function() {
        var startDate = new Date(2016, 2, 25);
        var endDate = new Date(2016, 3, 15);

        timeline.html(makeTimeline(startDate, endDate, 50));
    });

    function makeTimeline(startDate, endDate, a){
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
            tlMarkup.push('<div class="tlMember tlMember'+members[row].group+'">'+members[row].name+'</div>');

            for (var project = 0; project < members[row].projects.length; project++) {
                tlMarkup.push('<div class="tlProject">'+members[row].projects[project].name+'</div>');

                _start = new Date(startDate);
                for (var col = 0; col <= cols; col++) {
                    tlMarkup.push('<div class="tlCol tlCol'+members[row].group+'">'+getDateInfo(_start).month+'</div>');
                    _start.setDate(_start.getDate() + 1);
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

