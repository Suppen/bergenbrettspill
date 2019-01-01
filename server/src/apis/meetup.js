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
	events: queryParams => {
		// Add the API key to the query params
		const qp = R.merge(queryParams, { key: settings.apis.meetup.apiKey });

		// Get the data from the API
		return (
			request({
				uri: settings.apis.meetup.endpoints.events,
				qs: qp
			})
				// Parse it as JSON
				.then(JSON.parse)
				// Handle errors
				.catch(err => console.error(err)) // TODO
		);
	}
});

/*************
 * Export it *
 *************/

module.exports = setupMeetupAPI;
