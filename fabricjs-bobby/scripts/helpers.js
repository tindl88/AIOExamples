var helperJs = (function(){
	'use strict';

	return {
		generateRandomString: generateRandomString,
		getMimeTypeFromBase64: getMimeTypeFromBase64,
		convertBase64ToBlob: convertBase64ToBlob
	};

    function generateRandomString(length){
        return Math.random().toString(36).substring(length);
    }

    function getMimeTypeFromBase64(base64String){
        var rePattern = /data:(.*);/;
        var output = rePattern.exec(base64String)[1];
        return output;
    }

    function convertBase64ToBlob(dataURI, callback) {
    var byteString = atob(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab]);
    return bb;
}
})();