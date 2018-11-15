"use strict";

/**************************
 * Import important stuff *
 **************************/

const setupMeetupAPI = require("./meetup");

/*******************************
 * Make the API setup function *
 *******************************/

const setupAPIs = settings => ({
	meetup: setupMeetupAPI(settings)
});

/*************
 * Export it *
 *************/

module.exports = setupAPIs;
