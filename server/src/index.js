"use strict";

/**************************
 * Import important stuff *
 **************************/

const setupDBs = require("./dbs");
const setupAPIs = require("./apis");
const setupExpressApp = require("./expressApp");
const http = require("http");
const fs = require("fs");

/******************
 * Set up the app *
 ******************/

fs.promises
	.readFile("settings.json", "UTF-8")
	.then(JSON.parse)
	.then(settings => {
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
	});
