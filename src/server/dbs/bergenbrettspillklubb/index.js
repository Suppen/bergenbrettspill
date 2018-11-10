"use strict";

/**************************
 * Import important stuff *
 **************************/

const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const R = require("ramda");

/**************************
 * Make the init function *
 **************************/

/**
 * Gets a database
 *
 * @param {Sequelize} sequelize	The sequelize object to use for this database
 *
 * @returns {Promise<Object>}	The database
 */
const getDB = sequelize =>
	// Find all model files in this directory
	fs.promises
		.readdir(__dirname)
		// Filter out irrelevant files
		.then(
			R.filter(
				filename =>
					// Ignore files starting with dot
					R.compose(
						R.not,
						R.equals(0),
						R.indexOf(".")
					)(filename) &&
					// Ignore this file
					R.compose(
						R.not,
						R.equals(path.basename(__filename))
					)(filename) &&
					// Ignore non-js files
					R.compose(
						R.equals(".js"),
						R.slice(-3, Infinity)
					)(filename)
			)
		)
		// Build the models
		.then(
			R.reduce((db, filename) => {
				const model = sequelize.import(path.join(__dirname, filename));
				db[model.name] = model;
				return db;
			}, {})
		)
		// Sync the models to the actual DB
		.then(R.tap(db => Promise.all(Object.keys(db).map(modelName => db[modelName].sync()))))
		// Set up associations
		.then(R.tap(db => Object.keys(db).forEach(modelName => db[modelName].associate(db))))
		// Put sequelize stuff on the db object, for quick reference
		.then(db => {
			db.sequelize = sequelize;
			db.Sequelize = Sequelize;
			return db;
		});

module.exports = getDB;
