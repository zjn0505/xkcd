'use strict';

const SUCCESS_CODE = 200;
const CLIENT_FAILURE_CODE = 400;
const SERVER_FAILURE_CODE = 400;

var mongoose = require('mongoose'),
WhatIf = mongoose.model('whatif');

var latestIndex = 156;

exports.latestIndex = latestIndex;

exports.setLatest = function(latest) {
	latestIndex = latest;
}

exports.what_if_thumb_up = function(req, res) {
	var id = parseInt(req.body.what_if_id);
	if (id == NaN || id == null || id <= 0 || id > latestIndex + 2) {
		res.sendStatus(400);
		return;
	}
	WhatIf.findOne({'num' : id}, function(err, whatIf) {
		if (err || whatIf == null) {
			var newWhatIf = new WhatIf({
				num: id+"",
				thumbCount: 1,
			});
			res.json(newWhatIf);
			newWhatIf.save();
			return;
		}
		whatIf.thumbCount = whatIf.thumbCount + 1;
		whatIf.save(function(err, whatIfSaved) {
			if (err) {
				res.sendStatus(500);
			}
			if (whatIfSaved) {
				res.json(whatIfSaved);
			}
		});
	});
}

exports.what_if_top = function(req, res) {
	var sortby = req.query.sortby;
	var size = parseInt(req.query.size);
	if (sortby != "thumb-up") {
		res.sendStatus(400);
		return;
	}
	
	WhatIf.find({thumbCount: {$gt : 0}})
	.sort({thumbCount: -1})
	.limit(isNaN(size) ? 100 : size)
	.exec(function(err, docs) {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		}
		if (docs) {
			res.json(docs);
		}
	});
}
