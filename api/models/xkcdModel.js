var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var XkcdSchema = new Schema({
	num: {
		type: Number,
		unique: true,
		min: 1
	},
	alt: {
		type: String
	},
	title: {
		type: String
	},
	img: {
		type: String
	},
	width: {
		type: Number,
		default: 0
	},
	height: {
		type: Number,
		default: 0
	},
	day: {
		type: String
	},
	month: {
		type: String
	},
	year: {
		type: String
	},
	thumbCount: {
		type: Number,
		default: 0
	}

});
XkcdSchema.index({title:'text', alt:'text'}, {name: 'TextIndex', weights: {title: 20, alt: 4}});
module.exports = mongoose.model('xkcd', XkcdSchema);