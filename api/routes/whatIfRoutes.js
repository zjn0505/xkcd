'use strict';
var whatIfReqs = require('../controllers/whatIfController');

exports.latestIndex = whatIfReqs.latestIndex;

exports.setLatest = function(latestIndex) {
	whatIfReqs.setLatest(latestIndex);
}

exports.route = function(app) {

	app.route('/what-if-suggest')
	.get(whatIfReqs.what_if_suggest)
	
	app.route('/what-if-list')
	.get(whatIfReqs.what_if_list)

	app.route('/what-if-thumb-up')
	.post(whatIfReqs.what_if_thumb_up)
	
	app.route('/what-if-top')
	.get(whatIfReqs.what_if_top)

	app.route('/what-if-refresh')
	.post(whatIfReqs.what_if_refresh)

	app.route('/what-if-random')
	.get(whatIfReqs.what_if_random)
};