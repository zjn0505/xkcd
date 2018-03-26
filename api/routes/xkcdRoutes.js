'use strict';
var xkcdReqs = require('../controllers/xkcdController');

exports.latestIndex = xkcdReqs.latestIndex;

exports.route = function(app) {
	

	app.route('/xkcd-suggest')
	.get(xkcdReqs.xkcd_suggest)
	
	app.route('/xkcd-list')
	.get(xkcdReqs.xkcd_list)
};