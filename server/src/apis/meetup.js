"use strict";

/**************************
 * Import important stuff *
 **************************/

const request = require("request-promise");
const R = require("ramda");

/***************************
 * Make the setup function *
 ***************************/

const setupMeetupAPI = settings => ({
	events: queryParams =>
		request({
			uri: settings.apis.meetup.endpoints.events,
			qs: R.merge(queryParams, { key: settings.apis.meetup.apiKey })
		})
			// Parse it as JSON
			.then(JSON.parse)
			// Catch errors. The API key will be exposed in them...
			.catch(err => {
				// Pass on the error message without extra data
				throw new Error(err.message);
			})
});

/*************
 * Export it *
 *************/

module.exports = setupMeetupAPI;
