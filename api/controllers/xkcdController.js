'use strict';

const SUCCESS_CODE = 200;
const CLIENT_FAILURE_CODE = 400;
const SERVER_FAILURE_CODE = 400;

var mongoose = require('mongoose'),
	Xkcd = mongoose.model('xkcd');
var latestIndex = 2018;
exports.latestIndex = latestIndex;
exports.xkcd_suggest = function (req, res) {
	var keyword = req.query.q;
	var size = parseInt(req.query.size);
	if (!keyword) {
		res.sendStatus(SERVER_FAILURE_CODE);
		return;
	}
	var id = !isNaN(keyword) ? keyword : 0;
	Xkcd.find({
			$or: [{
					$text: {
						$search: keyword
					}
				},
				{
					"num": id
				}
			]
		}, {
			score: {
				$meta: "textScore"
			}
		}).limit(isNaN(size) ? 20 : size).sort({
			score: {
				$meta: "textScore"
			},
			"num": -1
		})
		.exec(
			function (err, docs) {
				if (err) {
					console.error(err);
				}
				if (docs) {
					res.json(docs);
				}
			});
}

exports.xkcd_list = function (req, res) {
	var start = parseInt(req.query.start);
	var reversed = parseInt(req.query.reversed);
	var size = parseInt(req.query.size);
	if (isNaN(start) || start < 0 || start > latestIndex ||
		(req.query.reversed && isNaN(reversed) || reversed != 0 && reversed != 1 && !isNaN(reversed)) ||
		(req.query.size && isNaN(size) || size < 0 && !isNaN(size)) ||
		(start == 0 && reversed != 1)) {
		res.sendStatus(400);
		return;
	}
	if (isNaN(reversed)) {
		reversed = 0;
	}
	if (isNaN(size)) {
		size = 100;
	}
	var end;
	if (reversed == 0) {
		end = start + size;
	} else if (start == 0 && reversed == 1) {
		end = latestIndex + 1;
		start = latestIndex - size;
	} else {
		end = start + 1;
		start = end - size;
	}
	end = end > latestIndex ? latestIndex + 1 : end;
	start = start < 1 ? 1 : start;
	Xkcd.find({
			num: {
				$gt: start - 1,
				$lt: end
			}
		})
		.sort({
			num: reversed == 0 ? 1 : -1
		})
		.exec(
			function (err, docs) {
				if (err) {
					console.error(err);
					res.sendStatus(500);
				}
				if (docs) {
					res.json(docs);
				}
			});
}

exports.setLatest = function (latest) {
	latestIndex = latest;
}

exports.xkcd_thumb_up = function (req, res) {
	var id = parseInt(req.body.comic_id);
	Xkcd.findOne({
		'num': id
	}, function (err, xkcd) {
		if (err || xkcd == null) {
			res.sendStatus(500);
			return;
		}
		xkcd.thumbCount = xkcd.thumbCount + 1;
		xkcd.save(function (err, xkcdSaved) {
			if (err) {
				res.sendStatus(500);
			}
			if (xkcdSaved) {
				res.json(xkcdSaved);
			}
		});
	});
}

exports.xkcd_top = function (req, res) {
	var sortby = req.query.sortby;
	var size = parseInt(req.query.size);
	if (sortby != "thumb-up") {
		res.sendStatus(400);
		return;
	}

	Xkcd.find({
			thumbCount: {
				$gt: 0
			}
		})
		.sort({
			thumbCount: -1
		}).limit(isNaN(size) ? 100 : size)
		.exec(function (err, docs) {
			if (err) {
				console.error(err);
				res.sendStatus(500);
			}
			if (docs) {
				res.json(docs);
			}
		});
}