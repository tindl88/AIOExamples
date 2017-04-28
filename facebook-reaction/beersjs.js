(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [
		{name:"beers_atlas_", frames: [[0,883,360,875],[578,1755,118,118],[0,1870,124,124],[126,1870,122,122],[0,0,431,881],[362,1755,214,194],[0,1760,352,108],[433,0,372,432],[362,883,372,434],[362,1319,372,434]]}
];


// symbols:



(lib.Beer = function() {
	this.spriteSheet = ss["beers_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.emo_1 = function() {
	this.spriteSheet = ss["beers_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.emo_2 = function() {
	this.spriteSheet = ss["beers_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.emo_3 = function() {
	this.spriteSheet = ss["beers_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Glass = function() {
	this.spriteSheet = ss["beers_atlas_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.logo1 = function() {
	this.spriteSheet = ss["beers_atlas_"];
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.logo2 = function() {
	this.spriteSheet = ss["beers_atlas_"];
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.player_1 = function() {
	this.spriteSheet = ss["beers_atlas_"];
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.player_2 = function() {
	this.spriteSheet = ss["beers_atlas_"];
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.player_3 = function() {
	this.spriteSheet = ss["beers_atlas_"];
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.text = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.txtNum = new cjs.Text("0", "bold 60px 'Arial'");
	this.txtNum.name = "txtNum";
	this.txtNum.textAlign = "center";
	this.txtNum.lineHeight = 69;
	this.txtNum.lineWidth = 184;
	this.txtNum.parent = this;
	this.txtNum.setTransform(24,2);

	this.timeline.addTween(cjs.Tween.get(this.txtNum).wait(1));

}).prototype = getMCSymbolPrototype(lib.text, new cjs.Rectangle(-70,0,188.1,71), null);


(lib.player_3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.player_3();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.player_3_1, new cjs.Rectangle(0,0,372,434), null);


(lib.player_2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.player_2();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.player_2_1, new cjs.Rectangle(0,0,372,434), null);


(lib.player_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.player_1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.player_1_1, new cjs.Rectangle(0,0,372,432), null);


(lib.name_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.txtName = new cjs.Text("Ngô Kiến Huy", "44px 'Arial'", "#1E2121");
	this.txtName.name = "txtName";
	this.txtName.lineHeight = 51;
	this.txtName.parent = this;
	this.txtName.setTransform(2,2);

	this.timeline.addTween(cjs.Tween.get(this.txtName).wait(1));

}).prototype = getMCSymbolPrototype(lib.name_3, new cjs.Rectangle(0,0,275.4,53.2), null);


(lib.name_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.txtName = new cjs.Text("Yến Trang", "44px 'Arial'", "#1E2121");
	this.txtName.name = "txtName";
	this.txtName.lineHeight = 51;
	this.txtName.parent = this;
	this.txtName.setTransform(2,2);

	this.timeline.addTween(cjs.Tween.get(this.txtName).wait(1));

}).prototype = getMCSymbolPrototype(lib.name_2, new cjs.Rectangle(0,0,209.5,53.2), null);


(lib.name_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.txtName = new cjs.Text("Hương Giang Idol", "44px 'Arial'", "#1E2121");
	this.txtName.name = "txtName";
	this.txtName.lineHeight = 51;
	this.txtName.parent = this;
	this.txtName.setTransform(2,2);

	this.timeline.addTween(cjs.Tween.get(this.txtName).wait(1));

}).prototype = getMCSymbolPrototype(lib.name_1, new cjs.Rectangle(0,0,355.7,53.2), null);


(lib.glass = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Glass();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.glass, new cjs.Rectangle(0,0,431,881), null);


(lib.emo_3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.emo_3();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.emo_3_1, new cjs.Rectangle(0,0,122,122), null);


(lib.emo_2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.emo_2();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.emo_2_1, new cjs.Rectangle(0,0,124,124), null);


(lib.emo_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.emo_1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.emo_1_1, new cjs.Rectangle(0,0,118,118), null);


(lib.beer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Beer();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.beer, new cjs.Rectangle(0,0,360,875), null);


(lib.glass_z = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 6
	this.text = new lib.text();
	this.text.parent = this;
	this.text.setTransform(273.2,721,1,1,0,0,0,49,18.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(50).to({regX:24,regY:35.5,x:248.2,y:737.7},0).wait(1).to({y:737},0).wait(1).to({y:736},0).wait(1).to({y:734.6},0).wait(1).to({y:732.8},0).wait(1).to({y:730.5},0).wait(1).to({y:727.8},0).wait(1).to({y:724.7},0).wait(1).to({y:721.1},0).wait(1).to({y:717.1},0).wait(1).to({y:712.8},0).wait(1).to({y:708},0).wait(1).to({y:702.8},0).wait(1).to({y:697.2},0).wait(1).to({y:691.2},0).wait(1).to({y:685},0).wait(1).to({y:678.3},0).wait(1).to({y:671.4},0).wait(1).to({y:664.3},0).wait(1).to({y:656.9},0).wait(1).to({y:649.3},0).wait(1).to({y:641.5},0).wait(1).to({y:633.6},0).wait(1).to({y:625.7},0).wait(1).to({y:617.7},0).wait(1).to({y:609.7},0).wait(1).to({y:601.8},0).wait(1).to({y:594},0).wait(1).to({y:586.3},0).wait(1).to({y:578.8},0).wait(1).to({y:571.5},0).wait(1).to({y:564.5},0).wait(1).to({y:557.7},0).wait(1).to({y:551.3},0).wait(1).to({y:545.1},0).wait(1).to({y:539.4},0).wait(1).to({y:534},0).wait(1).to({y:528.9},0).wait(1).to({y:524.3},0).wait(1).to({y:520},0).wait(1).to({y:516.2},0).wait(1).to({y:512.8},0).wait(1).to({y:509.8},0).wait(1).to({y:507.2},0).wait(1).to({y:505},0).wait(1).to({y:503.2},0).wait(1).to({y:501.8},0).wait(1).to({y:500.9},0).wait(1).to({y:500.3},0).wait(1).to({regX:49,regY:18.6,x:273.2,y:483.2},0).wait(1));

	// glass
	this.instance = new lib.glass();
	this.instance.parent = this;
	this.instance.setTransform(251.5,498.6,1,1,0,0,0,215.5,440.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(100));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EAA5BHdQjMgBivgeQjFgiiqhHQhSgjhahBQg3gogLg+QgLg+AihFQBXivATgqQA4h8AXhoQAjidARhTQAbiGARhsQA7mIgSnMQgHilgQjWIgdl6QgPi/ggkeQgfkZgjkCQgfjogtkPQgOhZgXiAIgojaIhQm4Qg+lNgcinQgOhXgai1QgZixgQhcQgaiYgFi1QgEiMAJjCQAGiTAQi/IAhlSQAIhTATiNQAWikAHg9QACgWAAg1QgBgxAFgaQACgSAPgTQAPgTAPgFQBggcBsgQQEXgoFMgMQD/gJFnAHQBsAADZgDQDAgBCEAGQCGAGCwARIE2AhQAqAEA1ANIBeAZQAlAKAKATQAIARgGArQgDAZADAiIAHA7IAtFfQAaDSAQCMQA1HFgaGKQgHBmgQCDIgfDoQgYCugxEgQgaCag5EzIhVHgQhJGagMBKQglDlgWCvQg6HDgbEBQgdEUgQEUQgMDVgFB3QgIC3AACVQAAHGBSGeQBAFACnFJQA2BsgfBPQgfBOhvArQl2CTlnALImrANQjYAHilAAIgugBg");
	mask.setTransform(205.3,457.4);

	// beer
	this.instance_1 = new lib.beer();
	this.instance_1.parent = this;
	this.instance_1.setTransform(241.6,1355.1,1,1,0,0,0,180,437.5);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({y:1354.9},0).wait(1).to({y:1354.3},0).wait(1).to({y:1353.4},0).wait(1).to({y:1352},0).wait(1).to({y:1350.3},0).wait(1).to({y:1348.2},0).wait(1).to({y:1345.6},0).wait(1).to({y:1342.7},0).wait(1).to({y:1339.4},0).wait(1).to({y:1335.6},0).wait(1).to({y:1331.5},0).wait(1).to({y:1327},0).wait(1).to({y:1322},0).wait(1).to({y:1316.7},0).wait(1).to({y:1311},0).wait(1).to({y:1304.8},0).wait(1).to({y:1298.3},0).wait(1).to({y:1291.3},0).wait(1).to({y:1284},0).wait(1).to({y:1276.3},0).wait(1).to({y:1268.1},0).wait(1).to({y:1259.6},0).wait(1).to({y:1250.8},0).wait(1).to({y:1241.5},0).wait(1).to({y:1231.9},0).wait(1).to({y:1221.9},0).wait(1).to({y:1211.6},0).wait(1).to({y:1200.9},0).wait(1).to({y:1189.9},0).wait(1).to({y:1178.5},0).wait(1).to({y:1166.9},0).wait(1).to({y:1155},0).wait(1).to({y:1142.7},0).wait(1).to({y:1130.2},0).wait(1).to({y:1117.4},0).wait(1).to({y:1104.4},0).wait(1).to({y:1091.2},0).wait(1).to({y:1077.7},0).wait(1).to({y:1064},0).wait(1).to({y:1050.2},0).wait(1).to({y:1036.2},0).wait(1).to({y:1022},0).wait(1).to({y:1007.7},0).wait(1).to({y:993.3},0).wait(1).to({y:978.9},0).wait(1).to({y:964.3},0).wait(1).to({y:949.7},0).wait(1).to({y:935.1},0).wait(1).to({y:920.5},0).wait(1).to({y:905.9},0).wait(1).to({y:891.3},0).wait(1).to({y:876.7},0).wait(1).to({y:862.3},0).wait(1).to({y:847.9},0).wait(1).to({y:833.6},0).wait(1).to({y:819.5},0).wait(1).to({y:805.5},0).wait(1).to({y:791.6},0).wait(1).to({y:778},0).wait(1).to({y:764.5},0).wait(1).to({y:751.3},0).wait(1).to({y:738.3},0).wait(1).to({y:725.5},0).wait(1).to({y:713},0).wait(1).to({y:700.7},0).wait(1).to({y:688.7},0).wait(1).to({y:677},0).wait(1).to({y:665.7},0).wait(1).to({y:654.6},0).wait(1).to({y:643.8},0).wait(1).to({y:633.4},0).wait(1).to({y:623.3},0).wait(1).to({y:613.5},0).wait(1).to({y:604.1},0).wait(1).to({y:595.1},0).wait(1).to({y:586.4},0).wait(1).to({y:578.1},0).wait(1).to({y:570.1},0).wait(1).to({y:562.5},0).wait(1).to({y:555.3},0).wait(1).to({y:548.5},0).wait(1).to({y:542},0).wait(1).to({y:535.9},0).wait(1).to({y:530.2},0).wait(1).to({y:524.9},0).wait(1).to({y:519.9},0).wait(1).to({y:515.3},0).wait(1).to({y:511.1},0).wait(1).to({y:507.3},0).wait(1).to({y:503.9},0).wait(1).to({y:500.8},0).wait(1).to({y:498.1},0).wait(1).to({y:495.7},0).wait(1).to({y:493.8},0).wait(1).to({y:492.2},0).wait(1).to({y:490.9},0).wait(1).to({y:490.1},0).wait(1).to({y:489.5},0).wait(1).to({y:489.4},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36,58.1,431,881);


// stage content:
(lib.beers = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Nhân vật nào anh em muốn gặp mặt nhất tại Vivo City?
	this.footerText = new cjs.Text("Nhân vật nào\nanh em muốn gặp mặt nhất tại Vivo City?", "70px 'Arial'", "#1E2121");
	this.footerText.name = "footerText";
	this.footerText.textAlign = "center";
	this.footerText.lineHeight = 78;
	this.footerText.parent = this;
	this.footerText.setTransform(988.3,1644.3);

	this.timeline.addTween(cjs.Tween.get(this.footerText).wait(1));

	// name_3
	this.name_3 = new lib.name_3();
	this.name_3.parent = this;
	this.name_3.setTransform(1515.7,648.1,1,1,0,0,0,154.7,32);

	this.timeline.addTween(cjs.Tween.get(this.name_3).wait(1));

	// name_2
	this.name_2 = new lib.name_2();
	this.name_2.parent = this;
	this.name_2.setTransform(992.5,650.1,1,1,0,0,0,116.5,32);

	this.timeline.addTween(cjs.Tween.get(this.name_2).wait(1));

	// name_1
	this.name_1 = new lib.name_1();
	this.name_1.parent = this;
	this.name_1.setTransform(451,650.2,1,1,0,0,0,191.8,32);

	this.timeline.addTween(cjs.Tween.get(this.name_1).wait(1));

	// emo_3
	this.emo3 = new lib.emo_3_1();
	this.emo3.parent = this;
	this.emo3.setTransform(1672,308.1,1,1,0,0,0,61,61);

	this.timeline.addTween(cjs.Tween.get(this.emo3).wait(1));

	// emo_2
	this.emo2 = new lib.emo_2_1();
	this.emo2.parent = this;
	this.emo2.setTransform(1145,307.1,1,1,0,0,0,62,62);

	this.timeline.addTween(cjs.Tween.get(this.emo2).wait(1));

	// emo_1
	this.emo1 = new lib.emo_1_1();
	this.emo1.parent = this;
	this.emo1.setTransform(623.8,310.1,1,1,0,0,0,59,59);

	this.timeline.addTween(cjs.Tween.get(this.emo1).wait(1));

	// player_3
	this.player3 = new lib.player_3_1();
	this.player3.parent = this;
	this.player3.setTransform(1501.8,399.7,1,1,0,0,0,186,217);

	this.timeline.addTween(cjs.Tween.get(this.player3).wait(1));

	// player_2
	this.player2 = new lib.player_2_1();
	this.player2.parent = this;
	this.player2.setTransform(977.5,399.7,1,1,0,0,0,186,217);

	this.timeline.addTween(cjs.Tween.get(this.player2).wait(1));

	// player_1
	this.player1 = new lib.player_1_1();
	this.player1.parent = this;
	this.player1.setTransform(458.9,400.7,1,1,0,0,0,186,216);

	this.timeline.addTween(cjs.Tween.get(this.player1).wait(1));

	// glass_z
	this.instance = new lib.logo2();
	this.instance.parent = this;
	this.instance.setTransform(1537,39);

	this.instance_1 = new lib.logo1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(38,26);

	this.glass1 = new lib.glass_z();
	this.glass1.parent = this;
	this.glass1.setTransform(202.8,676.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.glass1},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// glass_z
	this.glass2 = new lib.glass_z();
	this.glass2.parent = this;
	this.glass2.setTransform(746.8,676.2);

	this.timeline.addTween(cjs.Tween.get(this.glass2).wait(1));

	// glass_z
	this.glass3 = new lib.glass_z();
	this.glass3.parent = this;
	this.glass3.setTransform(1260.3,676.2);

	this.timeline.addTween(cjs.Tween.get(this.glass3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(998,985,1851,2442.8);
// library properties:
lib.properties = {
	width: 1920,
	height: 1918,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/beers_atlas_.png?1493290075372", id:"beers_atlas_"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;