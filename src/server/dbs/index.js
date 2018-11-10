"use strict";

/**************************
 * Import important stuff *
 **************************/

const Sequelize = require("sequelize");
const bbkGetDB = require("./bergenbrettspillklubb");

/****************************
 * Make the getter function *
 ****************************/

/**
 * Sets up all databases
 *
 * @param {Object} settings	Settings for the application
 *
 * @returns {Object}	An object containing the databases
 */
const setupDBs = settings => ({
	bergenbrettspillklubb: bbkGetDB(
		new Sequelize(
			settings.dbs.bergenbrettspillklubb.database,
			settings.dbs.bergenbrettspillklubb.username,
			settings.dbs.bergenbrettspillklubb.password,
			settings.dbs.bergenbrettspillklubb.config
		)
	)
});

/*************
 * Export it *
 *************/

module.exports = setupDBs;
