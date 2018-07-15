var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WhatIfSchema = new Schema({
	num: {
		type: Number,
		unique: true,
		min: 1
	},
	title: {
		type: String
	},
	featureImg: {
		type: String
	},
	content: {
		type: String
	},
	date: {
		type: String
	},
	thumbCount: {
		type: Number,
		default: 0
	}

});
WhatIfSchema.index({title:'text'}, {name: 'TextIndex', weights: {title: 20}});
module.exports = mongoose.model('whatif', WhatIfSchema);