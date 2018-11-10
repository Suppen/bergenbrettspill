"use strict";

/**************************
 * Import important stuff *
 **************************/

const express = require("express");
const path = require("path");
const csvParse = require("csv-parse");
const fs = require("fs");
const { promisify } = require("util");
const R = require("ramda");

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

	app.get("/api/boardgamelist", (req, res) => {
		dbs.bergenbrettspillklubb
			// Get all games
			.then(db => db.Boardgames.findAll())
			// Send them to the client
			.then(games => res.json(games))
			// Handle errors
			.catch(err => {
				console.error(err);
				res.sendStatus(500);
			});
	});

	return app;
};

/*****************************
 * Export the setup function *
 *****************************/

module.exports = setupExpressApp;
