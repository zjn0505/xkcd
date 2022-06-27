const whatIfUrl = 'https://what-if.xkcd.com';
const whatIfArchive = 'https://what-if.xkcd.com/archive';

var rp = require('request-promise-native'),
	notifier = require('../notifier'),
	routes = require('../api/routes/whatIfRoutes'),
	cheerio = require('cheerio');

var WhatIf;

latestWhatIfIndex = routes.latestIndex;

exports.register = function (whatIf) {
	WhatIf = whatIf;
}

exports.getLatest = function () {
	rp(whatIfUrl).then(parseLatest).then(function (article) {
		latestWhatIfIndex = article.num;
		routes.setLatest(latestWhatIfIndex);
		console.log("init what-if and the latest is " + latestWhatIfIndex);
	}).then(loadDb).catch(function (err) {
		console.error("init what-if Mongo failed " + err);
	});
}

exports.regularCheck = function () {
	console.log("what-if regular check, current index is " + latestWhatIfIndex);
	rp(whatIfUrl).then(parseLatest).then(function (article) {
			if (article.num > latestWhatIfIndex) {
				latestWhatIfIndex = article.num;
				routes.setLatest(latestWhatIfIndex);
				notifier.newWhatIfForFCM(article);
				return (article);
			} else {
				return Promise.reject("");
			}
		}).then(function (article) {
			return notifier.newWhatIfForFtqq(article);
		})
		.catch(function (err) {
			console.log(err);
		})
}

function parseLatest(html) {
	var article = {};
	var $ = cheerio.load(html)
	article.num = parseInt($("section#entry-wrapper a:first-child").attr("href").split("/")[3]) + 1;
	article.title = $("section#entry-wrapper h2#title a").html();
	return article;
}

function loadDb() {
	return rp(whatIfArchive).then(function (html) {
		var parsed = cheerio.load(html)("div.archive-entry");
		console.log(`Archive content parsed length ${parsed.length}`)
		parsed.each((id, content) => {
			let num = id + 1
			let parsedEntry = cheerio.load(content)
			let title = parsedEntry("h2.archive-title a").html()
			let date = parsedEntry("h3.archive-date").html()
			let featureImg = "https://what-if.xkcd.com/imgs/a/" + num + "/archive_crop.png";

			if (num == parsed.length) {
				console.log(`num ${num}, title ${title}, date ${date}, featureImg ${featureImg}`)
			}
			

			WhatIf.findOne({
				'num': num
			}, function (err, whatIf) {
				if (err || whatIf == null) {
					whatIf = new WhatIf();
				}
				whatIf.num = num;
				whatIf.title = title;
				whatIf.date = date;
				whatIf.featureImg = featureImg;
				whatIf.save();
			});

		});
	});
}
