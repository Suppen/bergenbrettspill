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
 * @param {Object} apis	The API object to use
 *
 * @returns {Object}	The express app
 */
const setupExpressApp = (settings, apis) => {
	// Initialize the app object
	const app = express();

	// Add GraphQL to it
	const apolloServer = makeApolloServer(settings, apis);
	apolloServer.applyMiddleware({ app });

	return app;
};

/*****************************
 * Export the setup function *
 *****************************/

module.exports = setupExpressApp;
