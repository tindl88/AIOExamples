var divEditor = document.getElementById('divEditor');
divEditor.contentEditable = true;

stateProps();
registerCommand();

function stateProps(){
	divEditor.addEventListener('click', function(event){

  var char = 3, sel; // character at which to place caret
divEditor.focus();
if (document.selection) {
  sel = document.selection.createRange();
  sel.moveStart('character', char);
  sel.select();
}
else {
   sel = window.getSelection();
  sel.collapse(divEditor.firstChild, char);
}



		var isItalic = document.queryCommandState ('italic');
		var isUnderline = document.queryCommandState ('underline');


		console.log(selection);
	});
}

function registerCommand(){
	var elements = document.getElementsByTagName('button');

	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener('click', function(){
			var command = this.innerText;
			document.execCommand(command, null, null);
		});
	}
}
function getSelected() {
    var text = "";
    if (window.getSelection
    && window.getSelection().toString()
    && $(window.getSelection()).attr('type') != "Caret") {
        text = window.getSelection();
        return text;
    }
    else if (document.getSelection
    && document.getSelection().toString()
    && $(document.getSelection()).attr('type') != "Caret") {
        text = document.getSelection();
        return text;
    }
    else {
        var selection = document.selection && document.selection.createRange();

        if (!(typeof selection === "undefined")
        && selection.text
        && selection.text.toString()) {
            text = selection.text;
            return text;
        }
    }

    return false;
}