"use strict";

/**************************
 * Import important stuff *
 **************************/

const setupDBs = require("./dbs");
const path = require("path");
const setupExpressApp = require("./expressApp");
const http = require("http");

/******************
 * Set up the app *
 ******************/

const settings = {
	dbs: {
		bergenbrettspillklubb: {
			database: null,
			username: null,
			password: null,
			config: {
				dialect: "sqlite",
				storage: path.join(__dirname, "..", "..", "bergenbrettspillklubb.db")
			}
		}
	},
	apis: {
		meetup: {
			apiKey: process.env.MEETUP_API_KEY,
			endpoins: {
				events: "https://api.meetup.com/Bergen-Brettspillklubb/events"
			}
		}
	}
};

const dbs = setupDBs(settings);

const app = setupExpressApp(settings, dbs);

const webserver = http.createServer(app);

/************
 * Start it *
 ************/

webserver.listen(3001);
