var divEditor = document.getElementById('divEditor');
divEditor.contentEditable = true;

stateProps();
registerCommand();

function stateProps(){
	divEditor.addEventListener('click', function(event){
		var isBold = document.queryCommandState ('bold');
		var isItalic = document.queryCommandState ('italic');
		var isUnderline = document.queryCommandState ('underline');

		console.log(isBold, isItalic, isUnderline);
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