(function(){
    'use strict';
    var mod = $('#mod-dragdrop');
    var dragItems = mod.find('.dragPanel .item'),
    dropArea = mod.find('.dropPanel'),
    classDropHere = 'drop-here';

    $.each(dropArea, function(i,o){
        $(this).on('dragover', onDragOver);
        $(this).on('drop', onDrop);
    });

    $.each(dragItems, function(i,o){
        $(this).on('dragstart ', onDragStart);
    });

    function onDragOver(e) {
        e.preventDefault();
        console.log('onDragOver');
    }

    function onDragStart(e){
        var data = $(e.currentTarget).data();
        data = JSON.stringify(data);
        e.originalEvent.dataTransfer.setData('text', data);
        console.log('onDragStart', data);

        dropArea.addClass(classDropHere);
    }

    function onDrop(e){
        e.preventDefault();
        var data = e.originalEvent.dataTransfer.getData('text');
        console.log('onDrop', data);

        dropArea.removeClass(classDropHere);
    }
})();
