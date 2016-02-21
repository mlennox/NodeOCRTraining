var fk = require('fontkit');
var pp = require('pretty-print');
var decirc = require('smart-circular');
var _ = require('lodash');

var gposLookupType = ['undefined', 'Single Adjustment', 'Pair Adjustment', 'Cursive Attachment', 'MarkToBase Attachment', 'MarkToLigature Attachment', 'MarkToMark Attachment', 'Context Positioning', 'Chained Context Positioning', 'Extension Positioning'];

var example_text = "Fi"

// need to do this automatically
var lg = fk.openSync('./fonts/luckiestguy/LuckiestGuy.ttf');

var lay = lg.layout(example_text);

// https://www.microsoft.com/typography/otspec/gpos.htm

// returns a restructure/Struct
// not sure how to access the properties yet
// var thing = lay.glyphs[0]._font._tables.GPOS.lookupList;

var tables = lay.glyphs[0]._font._tables;
var gpos = tables.GPOS;

var scriptList = gpos.scriptList;
console.log('script list', scriptList);

var featureList = gpos.featureList;
console.log('feature list', featureList);
console.log('feature list, lookup list indices', featureList[0].feature.lookupListIndexes);


// lookup list tables
// https://www.microsoft.com/typography/otspec/chapter2.htm

// when adjusting glyphs, run through each lookuplist
var lookupList = gpos.lookupList.items[0]; // it's a 'Struct'
console.log('lookupType -- ', gposLookupType[lookupList.lookupType]);
console.log('lookup list -- ', lookupList);

// then run through each subtable of each lookuplist

console.log('lookup list, subtables -- ', lookupList.subTables);
console.log('lookup list, coverage -- ', lookupList.subTables[0].coverage);
console.log('lookup list, class records [0] -- ', lookupList.classRecords);


// The GPOS table is organized so text processing clients can easily locate the features and lookups that apply to a particular script or language system. To access GPOS information, clients should use the following procedure:
// 
// 		Locate the current script in the GPOS ScriptList table.
// 		If the language system is known, search the script for the correct LangSys table; otherwise, use the script's default language system (DefaultLangSys table).
// 		The LangSys table provides index numbers into the GPOS FeatureList table to access a required feature and a number of additional features.
// 		Inspect the FeatureTag of each feature, and select the features to apply to an input glyph string.
// 		Each feature provides an array of index numbers into the GPOS LookupList table. Lookup data is defined in one or more subtables that contain information about specific glyphs and the kinds of operations to be performed on them.
// 		Assemble all lookups from the set of chosen features, and apply the lookups in the order given in the LookupList table.
// A lookup uses subtables to define the specific conditions, type, and results of a positioning action used to implement a feature. All subtables in a lookup must be of the same LookupType, as listed in the LookupType Enumeration table:

// LookupType Enumeration table for glyph positioning
// Value	Type	Description
// 1	Single adjustment	Adjust position of a single glyph
// 2	Pair adjustment	Adjust position of a pair of glyphs
// 3	Cursive attachment	Attach cursive glyphs
// 4	MarkToBase attachment	Attach a combining mark to a base glyph
// 5	MarkToLigature attachment	Attach a combining mark to a ligature
// 6	MarkToMark attachment	Attach a combining mark to another mark
// 7	Context positioning	Position one or more glyphs in context
// 8	Chained Context positioning	Position one or more glyphs in chained context
// 9	Extension positioning	Extension mechanism for other positionings
// 10+	Reserved	For future use (set to zero)
