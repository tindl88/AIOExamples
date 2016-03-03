(function(){
    'use strict';

    $(document).ready(function() {
        var treeData = [
        {id:1, parentId:0, name:'Điện thoại'},
        {id:2, parentId:1, name:'Nokia'},
        {id:3, parentId:2, name:'Lumia 928'},
        {id:4, parentId:2, name:'Lumia 800'},
        {id:5, parentId:0, name:'Xe'},
        {id:6, parentId:5, name:'Xe máy'},
        {id:7, parentId:5, name:'Xe hơi'},
        {id:8, parentId:7, name:'Audi'},
        {id:9, parentId:6, name:'Yamaha Exciter'}
        ];

        var list = recusiveList(treeData, 0);
        $('body').append('<ul class="list">' + list + '</ul>');

        var table = recusiveToTable(treeData, 0);
        $('body').append('<table border-collapse="collapse" class="grid">' + table + '</table>');
        gridEx();
    });

    function gridEx(){
        function hideCate(id){
            $.each($('.' + id),function(i,o){
                $(this).hide();
                $(this).find('.node').removeClass('tropen');
                hideCate($(o).attr('id'));
            });
        }

        // Chỉ hiển thị danh mục cha
        $.each($('.grid tr'),function(){
            $(this).attr('class') != 'row0' ? $(this).hide() : $(this).show();
        });

        // Sự kiện click vào danh mục
        $('.grid').delegate('.node','click',function(){
            var thisId = $(this).parent().parent().attr('id');
            if($(this).hasClass('tropen')){
                // Ẩn tất cả danh mục con
                $(this).removeClass('tropen').addClass('trclose');
                hideCate(thisId);
            }
            else{
                // Hiện danh mục con khi click và danh mục cha
                $(this).removeClass('trclose').addClass('tropen');
                $('.grid .' + thisId).show();
            }
        });
    }

    function recusiveList(data, parentId, seperator){
        seperator = seperator || '';

        var output = '';

        var items = data.filter(function(item){ return item.parentId == parentId });
        if(items.length){
            for (var i = 0; i < items.length; i++) {
                output += '<li>' + seperator + items[i].name + '</li>';
                output += recusiveList(data, items[i].id, seperator + "|----");
            }
        }

        return output;
    }

    function recusiveToTable(data, parentId, seperator, level){
        seperator = seperator || '';
        level = level || -1;

        var output = '';
        var items = data.filter(function(item){ return item.parentId == parentId });
        if(items.length){
            level++;

            for (var i = 0; i < items.length; i++) {
                var count = data.filter(function(o){ return o.parentId == items[i].id });
                output +=
                '<tr id="row' + items[i].id + '" class="row' + parentId + '">' +
                '<td>' + items[i].id + '</td>' +
                '<td>' + (count.length ? '<a class="node">+</a>' : '') + '</td>' +
                '<td>' + seperator + items[i].name + '</td>' +
                '<td>' + items[i].parentId + '</td>' +
                '</tr>';
                output += recusiveToTable(data, items[i].id, seperator + "|----", level);
            }
        }

        return output;
    }
})();
