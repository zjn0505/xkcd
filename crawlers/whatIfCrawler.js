const whatIfUrl = 'https://what-if.xkcd.com';
const whatIfArchive = 'https://what-if.xkcd.com/archive';

var rp = require('request-promise-native'),
	notifier = require('../notifier'),
	routes = require('../api/routes/whatIfRoutes'),
	cheerio = require('cheerio');

var WhatIf;

latestWhatIfIndex = routes.latestIndex;

exports.register = function(whatIf) {
	WhatIf = whatIf;
}

exports.getLatest = function() {
	rp(whatIfUrl).then(parseLatest).then(function(article) {
		latestWhatIfIndex = article.num;
		routes.setLatest(latestWhatIfIndex);
		console.log("init what-if and the latest is " + latestWhatIfIndex);
	}).then(loadDb).catch(function(err) {
		console.error("init what-if Mongo failed " + err);
	});
}

exports.regularCheck = function() {
	console.log("what-if regular check, current index is " + latestWhatIfIndex);
	rp(whatIfUrl).then(parseLatest).then(function(article) {
		if (article.num > latestWhatIfIndex) {
			latestWhatIfIndex = article.num;
			routes.setLatest(latestWhatIfIndex);
			notifier.newWhatIfForFCM(article);
			return(article);
		} else {
			return Promise.reject("");
		}      
	}).then(function(article) { return notifier.newWhatIfForFtqq(article, "serverChan"); })
	.then(function(article) { return notifier.newWhatIfForFtqq(article, "pushBear"); })
	.catch(function(err) {
		console.log(err);
	})
}

function parseLatest(html) {
	var article = {};
	var parsed = cheerio.load(html)("article a:first-child");
	article.num = parseInt(parsed.attr("href").split("/")[3]);
	article.title = parsed.children().first().html();
	return article;
}

function loadDb() {
	return rp(whatIfArchive).then(function (html) {
		var parsed = cheerio.load(html)("div#archive-wrapper");
		parsed.contents().map((id, content) => {
			var num = (id + 1) / 2;
			if (content.type == "tag") {
				
				var title = content.childNodes[3].childNodes[0].childNodes[0].data;

				WhatIf.findOne({'num' : num}, function(err, whatIf) {
					if (err || whatIf == null) {
						whatIf = new WhatIf();
					}
					whatIf.num = num;
					whatIf.title = title;
					whatIf.date = content.childNodes[5].childNodes[0].data;
					whatIf.featureImg = "https://what-if.xkcd.com/imgs/a/"+num+"/archive_crop.png";
					whatIf.save();
				});
			}
		});
	});
}