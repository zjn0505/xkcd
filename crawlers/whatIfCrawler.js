const whatIfUrl = 'https://what-if.xkcd.com';

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
	}).catch(function(err) {
		console.error("init Mongo failed " + err);
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