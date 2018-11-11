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

	// Use pug as template engine
	app.set("view engine", "pug");
	app.set("views", path.join(__dirname, "templates"));

	// Put the Apollo Server on it
	const apolloServer = makeApolloServer(settings, dbs);
	apolloServer.applyMiddleware({ app });

	app.get("/", (req, res) => {
		res.render("layouts/default/layout");
	});

	return app;
};

/*****************************
 * Export the setup function *
 *****************************/

module.exports = setupExpressApp;
