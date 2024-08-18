import setupAPIs from "./apis/index.js";
import setupExpressApp from "./expressApp/index.js";
import { createServer } from "http";
import { readFile } from "fs/promises";

/******************
 * Set up the app *
 ******************/

readFile("settings.json", "UTF-8")
	.then(JSON.parse)
	.then(async settings => {
		// Set up the APIs
		const apis = setupAPIs(settings);

		// Set up the express app
		const app = await setupExpressApp(settings, apis);

		// Put the express app on a web server
		const webserver = createServer(app);

		/************
		 * Start it *
		 ************/

		webserver.listen(settings.server.port);
	});
