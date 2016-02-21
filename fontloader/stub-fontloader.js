var fk = require('fontkit');
var _ = require('lodash');
var fse = require('fs-extra');

//var gposLookupType = ['undefined', 'Single Adjustment', 'Pair Adjustment', 'Cursive Attachment', 'MarkToBase Attachment', 'MarkToLigature Attachment', 'MarkToMark Attachment', 'Context Positioning', 'Chained Context Positioning', 'Extension Positioning'];

// we will want to load the texts too
var example_text = "FiiFPiiPMiiMNiiN"

function fetch_fonts() {
	console.log('going to fetch fonts');

	return new Promise(function(resolve, reject) {
		var fonts = [];

		fse.walk('../fonts')
			.on('data', function(item) {
				if (item && item.path && item.path.indexOf('.ttf') === item.path.length - 4){
					fonts.push(item.path);
				}
			})
			.on('end', function() {
				resolve(fonts);
			});
	});
}


function show_font_details(font) {
	console.log(example_text);

	var lg = fk.openSync(font);

	var lay = lg.layout(example_text);

	var glyph_pos_data = [];
	for (var g in lay.glyphs){
		var glyph = lay.glyphs[g],
			pos = lay.positions[g];

		// great! now all I have to do is figure out what this all means...
		glyph_pos_data.push({
			metrics: glyph._metrics,
			bbox: glyph.path.bbox,
			position: pos
		});
	}

	console.log('_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_', font);

	console.log(glyph_pos_data);

}


fetch_fonts()
	.then(function(fonts){
		// console.log(fonts);
		for (var font of fonts){
			console.log('details for font', font);
			show_font_details(font);
		}
	})
	.catch(function(err) {
		console.log(err);
	});