'use strict';
var whatIfReqs = require('../controllers/whatIfController');

exports.route = function(app) {

	app.route('/what-if-thumb-up')
	.post(whatIfReqs.what_if_thumb_up)
	
	app.route('/what-if-top')
	.get(whatIfReqs.what_if_top)
};