const xkcdUrl = 'https://xkcd.com/info.0.json';
const specialXkcds = 'https://raw.githubusercontent.com/zjn0505/Xkcd-Android/master/xkcd/src/main/res/raw/xkcd_special.json';
const specialXkcdsFallback = 'https://rawgit.com/zjn0505/Xkcd-Android/master/xkcd/src/main/res/raw/xkcd_special.json';


var sizeOf = require('image-size'),
	rp = require('request-promise-native'),
	notifier = require('../notifier'),
	routes = require('../api/routes/xkcdRoutes');

var specials, Xkcd;

latestIndex = routes.latestIndex;

exports.register = function(xkcd) {
	Xkcd = xkcd;
}

exports.getLatest = function() {
	rp(xkcdUrl).then(JSON.parse).then(function(latestComic) {
		latestIndex = latestComic.num;
		routes.setLatest(latestIndex);
		console.log("init xkcd and the latest is " + latestIndex);
	}).then(function() {
		return rp({ url: specialXkcds, simple: true }).catch(function(err) {
			console.log("Use special xkcds fallback");
			return rp(specialXkcdsFallback);
		}); 
	}).then(JSON.parse).then(function(specialsResp) {
		specials = specialsResp;
		console.log("init and the specials length is " + specials.length);
		return ids = range(1, latestIndex);
	}).then(function(ids) {
		return Promise.all(ids.map(getXkcdFullInfo));
	}).catch(function(err) {
		console.error("init xkcd Mongo failed " + err);
	});
}

exports.regularCheck = function() {
	console.log("xkcd regular check, current index is " + latestIndex);
	rp(xkcdUrl).then(JSON.parse).then(function(comics) {
		if (comics.num > latestIndex && specials) {
			latestIndex = comics.num;
			routes.setLatest(latestIndex);
			getXkcdFullInfo(latestIndex);
			notifier.newComicsForFCM(comics);
			console.log("new comics detected, id: " + comics.num);
			return(comics);
		} else {
			return Promise.reject("");
		}      
	}).then(function(comics) { return notifier.newComicsForFtqq(comics, "serverChan"); })
	.then(function(comics) { return notifier.newComicsForFtqq(comics, "pushBear"); })
	.catch(function(err) {
		console.log(err);
	})
}

function getXkcdFullInfo(id) {
	return Xkcd.findOne({'num' : id}).exec().then(function(doc) {
		if (!doc || !doc.width || !doc.height) {
			return queryAndAddToMongo(id);
		} else {
			return doc;
		}
	}).catch(function(err) {
		throw err;
	});
}

function queryAndAddToMongo(id) {
	var url = 'https://xkcd.com/' + id + '/info.0.json';
	return rp({ url: url, simple: true }).then(function(body) {
		var comics;
		try {
			comics = JSON.parse(body);
			for (var i = 0; i < specials.length; i++) {
				if (specials[i].num == comics.num && specials[i].img != undefined) {
					comics.img = specials[i].img;
				}
			}
		} catch (err) {
			console.error("Parse xkcd " + id + " error " + err);
			for (var i = 0; i < specials.length; i++) {
				if (specials[i].num == id && specials[i].img != undefined) {
					comics = specials;
					console.log("Apply " + comics.num + " from specials");
				}
			}
			if (!comics) {
				throw "Query xkcd failed " + id;
			}
		}
		return comics;
	}).then(getComicsWithSize).then(function(fullXkcd) {
		return fullXkcd.save().then(function(xkcdSaved) {
			return xkcdSaved;
		});
	}).catch(function(err) {
		console.error("Query xkcd failed " + id);
		throw err;
	});
}

function getComicsWithSize(comics) {
	return rp({ url: comics.img, encoding: null}).then(function(body) {
		if (!body) {
			throw "Download image failed: " + comics.num;
		}
		var dimens;
		try {
			dimens = sizeOf(body);
		} catch (sizeError) {
			throw "Invalid img " + comics.num + " " + comics.img
		}
		return new Xkcd({
			num: comics.num,
			raw: body,
			alt: comics.alt,
			title: comics.title,
			img: comics.img,
			day: comics.day,
			month: comics.month,
			year: comics.year,
			width: dimens.width,
			height: dimens.height
		});
	}).catch(function(err) {
		console.error("get xkcd size failed " + comics.num + " " + comics.img);
		throw err ;
	});
}

function range(start, end, step, offset) {
	var len = (Math.abs(end - start) + ((offset || 0) * 2)) / (step || 1) + 1;
	var direction = start < end ? 1 : -1;
	var startingPoint = start - (direction * (offset || 0));
	var stepSize = direction * (step || 1);
	return Array(len).fill(0).map(function(_, index) {
		return startingPoint + (stepSize * index);
	});
}