'use strict';
module.exports = function(app) {
	var xkcdReqs = require('../controllers/xkcdController');

	app.route('/xkcd-suggest')
	.get(xkcdReqs.xkcd_suggest)
	
	app.route('/xkcd-list')
	.get(xkcdReqs.xkcd_list)
};