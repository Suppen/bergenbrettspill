"use strict";

/**************************
 * Import important stuff *
 **************************/

const express = require("express");
const makeApolloServer = require("./apollo");

/***************************
 * Make the setup function *
 ***************************/

/**
 * Sets up the express app
 *
 * @param {Object} settings	Settings for the application
 * @param {Object} dbs	The database object to use
 * @param {Object} apis	The API object to use
 *
 * @returns {Object}	The express app
 */
const setupExpressApp = (settings, dbs, apis) => {
	// Initialize the app object
	const app = express();

	// Add GraphQL to it
	const apolloServer = makeApolloServer(settings, dbs, apis);
	apolloServer.applyMiddleware({ app });

	return app;
};

/*****************************
 * Export the setup function *
 *****************************/

module.exports = setupExpressApp;
