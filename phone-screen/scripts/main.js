(function(){
    'use strict';
    var mod = $('#mod-dragdrop'),
    dragItems = mod.find('#grid .inner'),
    offset = {x:0, y:0};

    dragItems.on('mousedown', function(event) {
        event.preventDefault();
        console.log('down');

        var pos = $(this).position();
        offset = {
            x: coordinate(event).pageX - pos.left,
            y: coordinate(event).pageY - pos.top
        };
    })
    .on('mousemove', function(event) {
        event.preventDefault();
        console.log('move');

        $(this).css({
            top: offset.y,
            left: offset.x
        });
    })
    .on('mouseup', function(event) {
        event.preventDefault();
        console.log('up');


    });

    function coordinate(event) {
        switch (event.type) {
            case 'touchstart':
            case 'touchmove':
            case 'touchend':
            case 'touchcancel':
            return event.originalEvent.touches[0];
            default:
            return event;
        }
    }
})();
