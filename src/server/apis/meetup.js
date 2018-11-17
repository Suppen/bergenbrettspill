"use strict";

/**************************
 * Import important stuff *
 **************************/

const request = require("request-promise");
const moment = require("moment");
const R = require("ramda");

/********************
 * Make some caches *
 ********************/

/**
 * Cache for the Meetup events
 *
 * @type {Object}
 *
 * @private
 */
const eventsCache = {
	data: null,
	expires: new Date(0)
};
const eventCacheTime = moment.duration(1, "hour");

/***************************
 * Make the setup function *
 ***************************/

const setupMeetupAPI = settings => ({
	events: queryParams => {
		if (moment().isBefore(eventsCache.expires)) {
			return eventsCache.data;
		}

		// Add the API key to the query params
		const qp = R.merge(queryParams, { key: settings.apis.meetup.apiKey });

		// Update the cache time
		eventsCache.expires = moment
			.utc()
			.add(eventCacheTime)
			.toDate();

		// Update the cached data
		eventsCache.data = request({
			uri: settings.apis.meetup.endpoints.events,
			qs: qp
		})
			// Parse it as JSON
			.then(JSON.parse)
			// Invalidate the cache on errors
			.catch(err => {
				eventsCache.expires = new Date(0);

				// Pass on the error
				throw err;
			});

		// Return the promise
		return eventsCache.data;
	}
});

/*************
 * Export it *
 *************/

module.exports = setupMeetupAPI;
