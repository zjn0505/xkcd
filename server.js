var FCM = require('fcm-push');
var serverKey = 'to fill';
var fcm = new FCM(serverKey);

var request = require('request');

var schedule = require('node-schedule');

const xkcdUrl = 'https://xkcd.com/info.0.json';

var latestIndex = 0;

var j = schedule.scheduleJob('10,40 * * * * *', function() {
        console.log("send request, current index is " + latestIndex);
        request(xkcdUrl, function(error, response, body) {
                var comics = JSON.parse(body)
//                if (comics.num > latestIndex) {
                	latestIndex = comics.num;
                	sendNotification(comics);
                	console.log("new comics detected, id: " + comics.num);
  //              }            
        });
});


var sendNotification = function(xkcd) {
	var message = {
	    to: '/topics/new_comics',
	    data: {
	        xkcd: xkcd
	    },
	    notification: {
	        title: 'New Xkcd comic coming',
	        body: xkcd.num + '-' + xkcd.title
	    }
	};
	fcm.send(message, function(err, response){
	    if (err) {
	        console.log("Something has gone wrong! " + err);
	    } else {
	        console.log("Successfully sent with response: ", response);
	    }
	});
}
