var FCM = require('fcm-push');
const fcmServerKey = process.env.XKCD_FCM_KEY;
var fcm = new FCM(fcmServerKey);
const serverChanKey = process.env.SERVER_CHAN_KEY;
var serverChanUrl = 'https://sc.ftqq.com/'+serverChanKey+'.send';

var request = require('request');
var schedule = require('node-schedule');
const xkcdUrl = 'https://xkcd.com/info.0.json';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/xkcd_db');

var latestIndex = 1966;

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
	        console.log("Something has gone wrong! " + err);
	    } else {
	        console.log("Successfully sent with response: ", response);
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
		            		reject(Error("Query xkcd failed " + err));
		            	}
		            	if (_xkcd == null) {
		            		var new_xkcd = new Xkcd({
		            			num: comics.num,
		            			raw: body,
	       		    			alt: comics.alt,
		            			title: comics.title,
		            			img: comics.img
		            		});
		            		new_xkcd.save(function(err, xkcdSaved) {
		            			if (err) {
		            				reject(Error("Save xkcd failed" + err));
		            			}
		            			if (xkcdSaved) {
		            				resolve("");
		            			}
		            		});
		            	}
	        	})              
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
    raw: {
        type: String
    },
    alt: {
        type: String
    },
    title: {
        type: String
    },
    img: {
        type: String
    }
});

Xkcd = mongoose.model('xkcd', XkcdSchema);

initMongo(latestIndex);
