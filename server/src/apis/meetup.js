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
			qs: R.mergeAll([queryParams, { key: settings.apis.meetup.apiKey }])
		})
			// Parse it as JSON
			.then(JSON.parse)
			// Convert the timestamp into a date object
			.then(R.map(e => R.mergeAll([e, { time: new Date(Number.parseInt(e.time)).toISOString() }])))
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
