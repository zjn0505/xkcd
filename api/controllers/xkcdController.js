'use strict';

const SUCCESS_CODE = 200;
const CLIENT_FAILURE_CODE = 400;
const SERVER_FAILURE_CODE = 400;

var mongoose = require('mongoose'),
Xkcd = mongoose.model('xkcd');
var latestIndex = 1971;
exports.latestIndex = latestIndex;
exports.xkcd_suggest = function(req, res) {
	var keyword = req.query.q;
	if (!keyword) {
		res.sendStatus(SERVER_FAILURE_CODE);
		return;
	}
	var id = !isNaN(keyword) ? keyword : 0;
	Xkcd.find(
	
	{$or: [
		{ $text: {$search: keyword}},
		{ "num" : id}
	]},
	{score: { $meta: "textScore" } }).limit(20).sort({score: { $meta: "textScore" } , "num": -1})
	.exec(
	function(err, docs) {
		if(err) {
			console.error(err);
		}
		if(docs) {
			res.json(docs);
		}
	});
}

exports.xkcd_list = function(req, res) {
	var start = parseInt(req.query.start);
	var reversed = parseInt(req.query.reversed);
	var size = parseInt(req.query.size);
	if (isNaN(start) || start < 0 || start > latestIndex ||
		 (req.query.reversed && isNaN(reversed) || reversed != 0 && reversed != 1 && !isNaN(reversed)) ||
		 (req.query.size && isNaN(size) || size < 0  && !isNaN(size))) {
		res.sendStatus(400);
		return;
	}
	if (isNaN(reversed)) { reversed = 0; }
	if (isNaN(size)) { size = 100; }
	var end;
	if (reversed == 0) {
		end = start + size;
	} else {
		end = start + 1;
		start = end - size;
	}
	end = end > latestIndex ? latestIndex + 1 : end;
	start = start < 1 ? 1 : start;
	Xkcd.find({num: {$gt : start - 1, $lt : end}}).exec(
	function(err, docs) {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		}
		if (docs) {
			res.json(docs);
		}
	});
}