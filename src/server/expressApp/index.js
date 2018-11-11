"use strict";

/**************************
 * Import important stuff *
 **************************/

const express = require("express");
const path = require("path");
const makeApolloServer = require("./apollo");

/***************************
 * Make the setup function *
 ***************************/

/**
 * Sets up the express app
 *
 * @param {Object} settings	Settings for the application
 * @param {Object} dbs	The database object to use
 *
 * @returns {Object}	The express app
 */
const setupExpressApp = (settings, dbs) => {
	// Initialize the app objec
	const app = express();

	// Use the "public" directory for static files
	app.use(express.static(path.join(__dirname, "..", "public")));

	// Put the Apollo Server on it
	const apolloServer = makeApolloServer(settings, dbs);
	apolloServer.applyMiddleware({ app });

	return app;
};

/*****************************
 * Export the setup function *
 *****************************/

module.exports = setupExpressApp;
