const fcmServerKey = process.env.XKCD_FCM_KEY || "000";
const serverChanKey = process.env.SERVER_CHAN_KEY || "000";
const xkcdUrl = 'https://xkcd.com/info.0.json';
const specialXkcds = 'https://raw.githubusercontent.com/zjn0505/Xkcd-Android/master/xkcd/src/main/res/raw/xkcd_special.json';
var serverChanUrl = 'https://sc.ftqq.com/'+serverChanKey+'.send';

var FCM = require('fcm-push'),
	fcm = new FCM(fcmServerKey),
	request = require('request'),
	schedule = require('node-schedule'),
	mongoose = require('mongoose'),
	express = require('express'),
	bodyParser = require('body-parser'),
	sizeOf = require('image-size'),
	app = express(),
	port = 3003,
	rp = require('request-promise-native'),
	XkcdModel = require('./api/models/xkcdModel');


	
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/xkcd_db');
Xkcd = mongoose.model('xkcd');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var routes = require('./api/routes/xkcdRoutes'); //importing route
routes.route(app); //register the route
latestIndex = routes.latestIndex;
app.listen(port);
var specials;

var j = schedule.scheduleJob('*/15 * * * *', function() {
	console.log("send request, current index is " + latestIndex);
	request(xkcdUrl, function(error, response, body) {
			var comics = JSON.parse(body)
			if (comics.num > latestIndex && specials) {
				latestIndex = comics.num;
				queryXkcd(latestIndex, specials);
				sendNotification(comics);
				console.log("new comics detected, id: " + comics.num);
				request.post({
					url: serverChanUrl,
					form: {text: 'Xkcd-' + comics.num + ' is on the way',
						   desp: '```json\n'+JSON.stringify(comics, null, 4)+ '\n```\n[![comics]('+comics.img+')]('+comics.img+')'}},
					function(error, response, body){
					if (error) { console.log(error); }
					if (body) { console.log("serverChan " + body); }
				});
			}            
	});
});

var sendNotification = function(xkcd) {
	var message = {
		to: '/topics/new_comics',
		collapse_key: 'new_comics',
		data: {
			xkcd: xkcd
		},
		android: {
		ttl: "172800s"
		},
			time_to_live: 172800
	};
	fcm.send(message, function(err, response){
		if (err) {
			console.log("FCM Something has gone wrong! " + err);
		} else {
			console.log("FCM Successfully sent with response: ", response);
		}
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

function initMongo(latestIndex) {
	rp(specialXkcds).then(JSON.parse).then(function(specials) {
		var ids = range(1, latestIndex);
		Promise.all(ids.map(function(x){ return queryXkcd(x, specials); }));
	}).catch(function(err) {
		console.error("init Mongo failed " + err);
	});
}

function queryXkcd(id, specials) {
	return new Promise(function(resolve, reject) {
		var sendXkcdQuery = function(id) {
			var xkcdUrl = 'https://xkcd.com/' + id + '/info.0.json';
			request(xkcdUrl, function(error, response, body) {
				if (error) {
					console.error("Query xkcd failed " + id + " " + error);
					resolve("");
					return;
				}
				var comics;
				try {
					comics = JSON.parse(body);
					for (var i = 0; i < specials.length; i++) {
						if (specials[i].num == comics.num && specials[i].img) {
							comics.img = specials[i].img;
						}
					}
				} catch (_err) {
					console.error("Parse xkcd " + id + " error " + _err);
					for (var i = 0; i < specials.length; i++) {
						if (specials[i].num == id && specials[i].img) {
							comics = specials;
						}
					}
					if (!comics) {
						resolve("");
						return;
					}
				}
				Xkcd.findOne({'num' : comics.num}, function(err, _xkcd) {
					if (err) {
						reject(Error("Query xkcd failed"));
					}
					request.get({ url: comics.img, encoding: null}, function(err, response, body) {
						if (err || !body) {
							reject(Error("Download image failed: " + comics.num));
						}
						var dimens;
						try {
							dimens = sizeOf(body);
						} catch (sizeError) {
							console.log(comics.num)
							console.log(comics.img)
							reject(Error("Invalid img " + comics.num))
							return;
						}
						var new_xkcd = new Xkcd({
							num: comics.num,
							raw: body,
							alt: comics.alt,
							title: comics.title,
							img: comics.img,
							width: dimens.width,
							height: dimens.height
						});
						new_xkcd.save(function(err, xkcdSaved) {
							if (err) {
								reject(Error("Save xkcd failed" + err));
							}
							if (xkcdSaved) {
								resolve("");
							}
						});
					});
				});
			});
		}
		Xkcd.findOne({'num' : id}, function(err, _xkcd) {
			if (err || _xkcd == null || (latestIndex - id) < 10 || _xkcd.width == 0) {
				sendXkcdQuery(id);
				return;
			} else {
				resolve("");
			}
		});   
	});
}



initMongo(latestIndex);
