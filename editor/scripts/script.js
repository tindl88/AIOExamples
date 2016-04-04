var iframeDocument = document.getElementById('editor').contentDocument;
iframeDocument.designMode = 'on';

$(iframeDocument).find('body').append('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem nulla, sollicitudin nec commodo quis, ultricies in mauris. Cras facilisis pretium nunc ut auctor. Fusce congue diam sit amet ipsum luctus vitae porttitor sapien egestas. Suspendisse vestibulum nibh vitae nulla accumsan sed laoreet dolor iaculis. Vivamus id laoreet felis.');

$('button').click(function() {
    var command = $(this).text();
    iframeDocument.execCommand(command, null, null);
});

$('#gethtml').click(function() {
    var html = $('#editor').contents().find('body').html();
    $('#result').text(html);
    return false;
});