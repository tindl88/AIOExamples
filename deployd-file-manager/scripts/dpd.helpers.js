var dpdJs = (function(){
	'use strict';

    var configs = {
        baseURL: 'http://localhost:5555/'
    };

    return {
        list: list,
        detail: detail,
        save: save,
        remove: remove
    };

    function list(){
        return $.ajax({
            method: 'GET',
            url: configs.baseURL + 'fileupload/',
            contentType: 'json'
        });
    }

    function detail(id){
        return $.ajax({
            method: 'GET',
            url: configs.baseURL + 'fileupload/' + id,
            contentType: 'json'
        });
    }

    function save(file){
        var fd = new FormData();
        fd.append("uploadFile", file);

        return $.ajax({
            method: 'POST',
            url: configs.baseURL + 'fileupload/',
            data: fd,
            contentType: false,
            processData: false
        });
    }

    function remove(id){
        return $.ajax({
            method: 'DELETE',
            url: configs.baseURL + 'fileupload/' + id,
            contentType: 'json'
        });
    }
})();