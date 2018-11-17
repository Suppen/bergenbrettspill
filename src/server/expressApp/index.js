"use strict";

/**************************
 * Import important stuff *
 **************************/

const express = require("express");
const path = require("path");
const fs = require("fs");
const R = require("ramda");
const moment = require("moment");

/*********************
 * Make some helpers *
 *********************/

const publicDir = path.join(__dirname, "..", "public");

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
	// Initialize the app objec
	const app = express();

	// Use the "public" directory for static files
	app.use(express.static(publicDir));

	// Use pug as template engine
	app.set("view engine", "pug");
	app.set("views", path.join(__dirname, "templates"));

	app.get("/", (req, res) =>
		Promise.all([
			fs.promises
				.readdir(path.join(publicDir, "img", "carousel"))
				.then(
					R.filter(
						R.compose(
							R.flip(R.contains)([".png", ".jpg", ".gif"]),
							R.slice(-4, Infinity)
						)
					)
				)
				.then(R.map(R.concat("/img/carousel/"))),
			apis.meetup.events({ page: 6 }),
			dbs.bergenbrettspillklubb.then(db => db.Boardgames.count({ where: { expands: null } }))
		]).then(([carouselFilenames, events, gamecount]) =>
			res.render("frontpage/index", {
				header: {
					activeTab: null
				},
				description: {
					gamecount
				},
				events: { events, moment },
				carousel: {
					imageUrls: carouselFilenames
				}
			})
		)
	);

	app.get("/games", (req, res) =>
		dbs.bergenbrettspillklubb
			.then(db => db.Boardgames.scope("withMechanics").findAll({ order: [["title", "ASC"]] }))
			.then(games => res.render("gamelist", { header: { activeTab: "games" }, gamelist: { games } }))
	);

	app.get("/where", (req, res) => res.render("where", { header: { activeTab: "where" } }));

	return app;
};

/*****************************
 * Export the setup function *
 *****************************/

module.exports = setupExpressApp;
