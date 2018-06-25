var	schedule = require('node-schedule'),
	mongoose = require('mongoose'),
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	port = 3003,
	XkcdModel = require('./api/models/xkcdModel'),
	WhatIfModel = require('./api/models/whatIfModel'),
	xkcdCrawler = require('./crawlers/xkcdCrawler'),
	whatIfCrawler = require('./crawlers/whatIfCrawler');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/xkcd_db');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var routes = require('./api/routes/xkcdRoutes'); //importing route
routes.route(app); //register the route
var routesWhatIf = require('./api/routes/whatIfRoutes');
routesWhatIf.route(app);
app.listen(port);

xkcdCrawler.register(mongoose.model('xkcd'));
whatIfCrawler.register(mongoose.model('whatif'));

// check xkcd update every 15 minutes
schedule.scheduleJob('*/15 * * * *', function() {
	xkcdCrawler.regularCheck();
});

// check what-if update everyday
schedule.scheduleJob('0 0 * * *', function() {
	whatIfCrawler.regularCheck();
});

xkcdCrawler.getLatest();
whatIfCrawler.getLatest();
whatIfCrawler.regularCheck();