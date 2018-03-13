var FCM = require('fcm-push');
const fcmServerKey = process.env.XKCD_FCM_KEY;
var fcm = new FCM(fcmServerKey);
const serverChanKey = process.env.SERVER_CHAN_KEY;
var serverChanUrl = 'https://sc.ftqq.com/'+serverChanKey+'.send';

var request = require('request');

var schedule = require('node-schedule');

const xkcdUrl = 'https://xkcd.com/info.0.json';

var latestIndex = 1966;

var j = schedule.scheduleJob('*/15 * * * *', function() {
        console.log("send request, current index is " + latestIndex);
        request(xkcdUrl, function(error, response, body) {
                var comics = JSON.parse(body)
                if (comics.num > latestIndex) {
                	latestIndex = comics.num;
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
