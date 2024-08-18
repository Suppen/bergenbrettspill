"use strict";

const setupMeetupAPI = require("./meetup");
const setupBoardGameGeekAPI = require("./boardGameGeek");

/*******************************
 * Make the API setup function *
 *******************************/

const setupAPIs = settings => ({
	meetup: setupMeetupAPI(settings),
	boardGameGeek: setupBoardGameGeekAPI()
});

/*************
 * Export it *
 *************/

module.exports = setupAPIs;
