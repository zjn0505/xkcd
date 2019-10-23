var	schedule = require('node-schedule'),
	debug = require('debug')('server'),
	config = require('config'),
	mongoose = require('mongoose'),
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	port = config.port,
	swStats = require('swagger-stats'),
	XkcdModel = require('./api/models/xkcdModel'),
	WhatIfModel = require('./api/models/whatIfModel'),
	xkcdCrawler = require('./crawlers/xkcdCrawler'),
    whatIfCrawler = require('./crawlers/whatIfCrawler');
    
const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

if (config.has("swagger-stats")) {
    var swaggerConfig = config.get("swagger-stats");
    app.use(swStats.getMiddleware({
        name: swaggerConfig.name,
        uriPath: swaggerConfig.urlPath,
        onResponseFinish: function (req, res, rrr) {
            let log = JSON.stringify(rrr)
            debug('onResponseFinish: %s', log);
            logger.info(log)
        },
        authentication: true,
        sessionMaxAge: 900,
        elasticsearchIndexPrefix: swaggerConfig.elasticsearchIndexPrefix,
        elasticsearch: swaggerConfig.elasticsearch,
        onAuthenticate: function (req, username, password) {
            return ((username === swaggerConfig.username) && (password === swaggerConfig.password));
        }
    }));
}

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
