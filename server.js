const fcmServerKey = process.env.XKCD_FCM_KEY;
const serverChanKey = process.env.SERVER_CHAN_KEY;
const xkcdUrl = 'https://xkcd.com/info.0.json';
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
	port = 3003;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/xkcd_db');
var latestIndex = 1966;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.listen(port);
app.get('/xkcd-suggest', function(req, res) {
	var keyword = req.query.q;
	if (!keyword) {
		res.sendStatus(500);
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
});

app.get('/xkcd-list', function(req, res) {
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

});

var j = schedule.scheduleJob('*/15 * * * *', function() {
	console.log("send request, current index is " + latestIndex);
	request(xkcdUrl, function(error, response, body) {
			var comics = JSON.parse(body)
			if (comics.num > latestIndex) {
				latestIndex = comics.num;
		queryXkcd(latestIndex);
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
	var ids = range(1, latestIndex);
	Promise.all(ids.map(queryXkcd)).catch(function(err) {
		console.error("init Mongo failed " + err);
	});
}

function queryXkcd(id) {
	return new Promise(function(resolve, reject) {
		var sendXkcdQuery = function(id) {
			var xkcdUrl = 'https://xkcd.com/' + id + '/info.0.json';
			request(xkcdUrl, function(error, response, body) {
				if (error) {
					console.error("Query xkcd failed " + id + " " + error);
					resolve("");
				}
				var comics;
				try {
					comics = JSON.parse(body);
				} catch (_err) {
					console.error("Parse xkcd " + id + " error " + _err);
					resolve("");
					return;
				}
				Xkcd.findOne({'num' : comics.num}, function(err, _xkcd) {
					if (err) {
						reject(Error("Query xkcd failed"));
					}
					request.get({ url: comics.img, encoding: null}, function(err, response, body) {
						if (err || !body) {
							reject(Error("Download image failed: " + comics.num));
						}
						var dimens = sizeOf(body);
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

var Schema = mongoose.Schema;

var XkcdSchema = new Schema({
	num: {
		type: Number,
		unique: true,
		min: 1
	},
	alt: {
		type: String
	},
	title: {
		type: String
	},
	img: {
		type: String
	},
	width: {
		type: Number,
		default: 0
	},
	height: {
		type: Number,
		default: 0
	}
});
XkcdSchema.index({title:'text', alt:'text'}, {name: 'TextIndex', weights: {title: 20, alt: 4}});
Xkcd = mongoose.model('xkcd', XkcdSchema);

initMongo(latestIndex);
