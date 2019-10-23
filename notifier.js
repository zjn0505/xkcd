var rp = require('request-promise-native'),
	admin = require('firebase-admin'),
	config = require('config');

admin.initializeApp({
	credential: admin.credential.cert(config.fcm.serviceAccount),
	databaseURL: config.fcm.databaseURL
});

var fcm = admin.messaging();


var testToken = "f-ca6HW5uNc:APA91bG2fWDN-RZ3P564ul_8xZUQ6qyCH1WCNGef2u6o7lkObqNjJfJDF5kv-WGYl2-osmJ3DvH6Lfan6M3VXGELp3YHLpkkTEZhktcfXOq7P85KYUE4_vEXAzIlxHoHbyWuSbjCgjkl"


var serverChanUrl = 'https://sc.ftqq.com/' + config.serverChanKey + '.send';

exports.newComicsForFCM = function (xkcd) {
	console.log(xkcd)
	var message = {
		topic: "new_comicss",
		data: {
			xkcd: JSON.stringify(xkcd)
		},
		android: {
			collapse_key: "new_comics",
			priority: "high",
			ttl: 60 * 60 * 24 * 2 * 1000,
			fcm_options: {
				analytics_label: `${xkcd.num}-Android`
			},
		},
		fcm_options: {
			analytics_label: `${xkcd.num}`
		},
	};
	var options = {
		priority: "high",
		timeToLive: 60 * 60 * 24 * 2,
		fcmOptions: {
			analyticsLabel: `${xkcd.num}`
		},
		android: {
			collapseKey: "new_comics"
		}
	};
	console.log("sendMessage")
	fcm.send(message)
	// fcm.sendToDevice("new_comics", message, options)
		.then(JSON.stringify)
		.then(resp => console.log(`FCM Successfully sent with response: ${resp}`))
		.catch(e => console.error(`FCM Something has gone wrong! ${e}`))
}

exports.newWhatIfForFCM = function (article) {
	console.log(article)
	var message = {
		data: {
			whatif: JSON.stringify(article)
		}
	};
	var options = {
		priority: "high",
		timeToLive: 60 * 60 * 24 * 7 * 4,
		fcmOptions: {
			analyticsLabel: `${article.num}`
		},
		android: {
			collapseKey: "new_what_if"
		}
	};
	console.log("sendMessage")
	fcm.sendToTopic("new_what_if", message, options)
		.then(JSON.stringify)
		.then(resp => console.log(`FCM Successfully sent with response: ${resp}`))
		.catch(e => console.error(`FCM Something has gone wrong! ${e}`))
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