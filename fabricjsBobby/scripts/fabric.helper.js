(function(){
	'use strict';
	fabric.Object.prototype.originX = 'left';
	fabric.Object.prototype.originY = 'top';
	fabric.Object.prototype.hoverCursor = 'pointer';
	fabric.Object.prototype.transparentCorners = false;
	fabric.Object.prototype.hasControls = false;
	fabric.Object.prototype.hasBorders = false;
	fabric.Object.prototype.hasRotatingPoint = false;
	fabric.Object.prototype.borderColor = 'red';
	fabric.Object.prototype.cornerSize = 8;
	fabric.Object.prototype.cornerColor = 'red';
	fabric.Object.prototype.selection = false;
	fabric.Object.prototype.selectable = true;
	fabric.Object.prototype.lockScalingX = false;
	fabric.Object.prototype.lockScalingY = false;

	fabric.Canvas.prototype.getItemsByUnique = function(unique) {
		var all = this.getObjects(), output = [];
		for (var i = 0; i < all.length; i++) {
			if(all[i].unique === unique){
				output.push(all[i]);
			}
		};

		return output;
	}

	fabric.Canvas.prototype.addImage = function(params, callback) {
		var self = this;
		fabric.Image.fromURL(params.url, function (oImg) {
			self.add(oImg);
			if(typeof callback === 'function'){
				callback(oImg);
			}
		}, params);
	}

	fabric.Canvas.prototype.setImage = function(params) {
		var self = this;
		var items = this.getItemsByUnique(params.unique);
		for (var i = 0; i < items.length; i++) {
			items[i].setSrc(params.url, function(){
				self.renderAll();
			});
		}
	}

	fabric.Canvas.prototype.addText = function(params) {
		var text = new fabric.Text(params.text, params);
		if(!params.inMemory){
			this.add(text);
		}
		return text;
	}
})();
