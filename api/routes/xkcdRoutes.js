'use strict';
var xkcdReqs = require('../controllers/xkcdController');

exports.latestIndex = xkcdReqs.latestIndex;

exports.setLatest = function(latestIndex) {
	xkcdReqs.setLatest(latestIndex);
}

exports.route = function(app) {
	
	app.route('/xkcd-suggest')
	.get(xkcdReqs.xkcd_suggest)
	
	app.route('/xkcd-list')
	.get(xkcdReqs.xkcd_list)
	
	app.route('/xkcd-thumb-up')
	.post(xkcdReqs.xkcd_thumb_up)
	
	app.route('/xkcd-top')
	.get(xkcdReqs.xkcd_top)
};