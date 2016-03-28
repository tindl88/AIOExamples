/***************************************************
Description: Các hàm tiện ích
****************************************************/
var helperJs = (function() {
    'use strict';
    return {
        dayCount: dayCount,
        dateBetween: dateBetween,
        dateContain: dateContain,
        getDateInfo: getDateInfo
    };

    function dayCount(date1, date2) {
        var oneDay = 1000 * 60 * 60 * 24;
        return Math.round((date2.getTime() - date1.getTime()) / oneDay);
    }

    function dateBetween(date, startDate, endDate) {
        return date >= startDate && date <= endDate;
    }

    function dateContain(date, dateArray) {
        var result = dateArray.filter(function(value){
            return new Date(Date.parse(value)).toDateString() === date.toDateString();
        });
        return result.length !== 0;
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