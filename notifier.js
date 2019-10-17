const fcmServerKey = process.env.XKCD_FCM_KEY || "000";
const serverChanKey = process.env.SERVER_CHAN_KEY || "000";

var serverChanUrl = 'https://sc.ftqq.com/' + serverChanKey + '.send';

var rp = require('request-promise-native'),
	FCM = require('fcm-push'),
	fcm = new FCM(fcmServerKey);

if (fcmServerKey == "000" || serverChanKey == "000") {
	console.error("Invalid key initialzation");
}

exports.newComicsForFCM = function (xkcd) {
	var message = {
		to: '/topics/new_comics',
		collapse_key: 'new_comics',
		data: {
			xkcd: xkcd
		},
		android: {
			ttl: "172800s",
			"priority": "high"
		},
		fcm_options: {
			"analytics_label": xkcd.num
		},
		time_to_live: 172800
	};
	fcm.send(message, function (err, response) {
		if (err) {
			console.log("FCM Something has gone wrong! " + err);
		} else {
			console.log("FCM Successfully sent with response: ", response);
		}
	});
}

exports.newWhatIfForFCM = function (article) {
	var message = {
		to: '/topics/new_what_if',
		collapse_key: 'new_what_if',
		data: {
			whatif: article
		},
		android: {
			ttl: "172800s",
			"priority": "high"
		},
		fcm_options: {
			"analytics_label": article.num
		},
		time_to_live: 172800
	};
	fcm.send(message, function (err, response) {
		if (err) {
			console.log("FCM Something has gone wrong! " + err);
		} else {
			console.log("FCM Successfully sent with response: ", response);
		}
	});
}

exports.newComicsForFtqq = function (comics) {
	var options = {
		method: 'POST',
		url: serverChanUrl,
		form: {
			text: 'xkcd-' + comics.num + '-is-on-the-way',
			desp: '```json\n' + JSON.stringify(comics, null, 4) + '\n```\n[![comics](' + comics.img + ')](' + comics.img + ')'
		}
	}
	return rp(options).then(function (body) {
		if (body) {
			console.log("ftqq " + body);
		} else {
			throw "ftqq request failed"
		}
		return (comics);
	});
}

exports.newWhatIfForFtqq = function (article) {
	console.log("sending ... " + article)
	var options = {
		method: 'POST',
		url: serverChanUrl,
		form: {
			text: 'what-if-' + article.num + '-is-on-the-way',
			desp: article.title + '\n https://whatif.xkcd.com/' + article.num
		}
	}
	return rp(options).then(function (body) {
		if (body) {
			console.log("ftqq " + body);
		} else {
			throw "ftqq request failed"
		}
		return (article);
	});
}