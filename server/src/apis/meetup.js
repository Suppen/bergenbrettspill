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
			qs: queryParams
		})
			// Parse it as JSON
			.then(JSON.parse)
			// Convert the timestamp into a date object
			.then(R.map(e => R.mergeAll([e, { time: new Date(Number.parseInt(e.time)).toISOString() }])))
			// Convert rsvp data to an rsvp object
			.then(
				R.map(
					R.when(R.has("rsvp_limit"), obj =>
						R.assoc("rsvp", { limit: obj.rsvp_limit, yes: obj.yes_rsvp_count, waitlistCount: obj.waitlist_count }, obj)
					)
				)
			)
			// Catch errors. The API key will be exposed in them...
			.catch(err => {
				// Pass on the error message without extra data
				throw new Error(err.message);
			}),
	photos: () =>
		request({
			uri: settings.apis.meetup.endpoints.photos
		})
			// Parse it as JSON
			.then(JSON.parse)
			// Extract the photo URLs
			.then(R.map(R.prop("photo_link")))
});

/*************
 * Export it *
 *************/

module.exports = setupMeetupAPI;
