import setupMeetupAPI from "./meetup.js";
import setupBoardGameGeekAPI from "./boardGameGeek.js";

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

export default setupAPIs;
