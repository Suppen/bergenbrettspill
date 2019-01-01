"use strict";

/**************************
 * Import important stuff *
 **************************/

const setupDBs = require("./dbs");
const setupAPIs = require("./apis");
const path = require("path");
const setupExpressApp = require("./expressApp");
const http = require("http");

/******************
 * Set up the app *
 ******************/

const settings = {
	server: {
		port: Number.parseInt(process.env.PORT)
	},
	dbs: {
		bergenbrettspillklubb: {
			database: null,
			username: null,
			password: null,
			config: {
				dialect: "sqlite",
				storage: path.join(__dirname, "..", "bergenbrettspillklubb.db")
			}
		}
	},
	apis: {
		meetup: {
			apiKey: process.env.MEETUP_API_KEY,
			endpoints: {
				events: "https://api.meetup.com/Bergen-Brettspillklubb/events"
			}
		}
	}
};

// Set up the databases
const dbs = setupDBs(settings);

// Set up the APIs
const apis = setupAPIs(settings);

// Set up the express app
const app = setupExpressApp(settings, dbs, apis);

// Put the express app on a web server
const webserver = http.createServer(app);

/************
 * Start it *
 ************/

webserver.listen(settings.server.port);
