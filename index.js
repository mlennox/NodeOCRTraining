var fk = require('fontkit');
var pp = require('pretty-print');
var decirc = require('smart-circular');
var _ = require('lodash');

var example_text = "'Tis the Fame and Fills the Soul"

var lg = fk.openSync('./fonts/luckiestguy/LuckiestGuy.ttf');

var lay = lg.layout(example_text);

// https://www.microsoft.com/typography/otspec/gpos.htm

// returns a restructure/Struct
// not sure how to access the properties yet
var thing = lay.glyphs[0]._font._tables.GPOS.lookupList; 

// console.log('pair adjustment (kerning)', _.filter(thing.items[0].subTables, 
console.log('pair adjustment (kerning)', _.filter(thing.items[0].subTables[0], 
	function(item) {
		console.log(item);
		return item.rangeRecords;
	}
));


// for (var i in thing){
// 	console.log(i, thing[i]);
// }

// pp(decirc(thing));

// console.log('lay', lay.glyphs[0]._font._tables.cmap.tables[0].table);

// some details on how to find the kerning maybe?
// http://www.freetype.org/freetype2/docs/tutorial/step2.html#section-4

// for (var table of lay.glyphs[0]._font._tables) {
// 	console.log('table', table);
// }


// var examples = ['Fi','FM'];

// for (example of examples) {
// 	var glyphs = lg.glyphsForString(example);

// 	console.log('glyphs for ' + example,glyphs);
// }



// console.log('lay', lay.glyphs[0]);

// for (item of lay.glyphs[0]) {
// 	console.log('item', item);
// }



