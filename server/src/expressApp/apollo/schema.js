"use strict";

/**************************
 * Import important stuff *
 **************************/

const { gql } = require("apollo-server-express");
const R = require("ramda");

/*********************************
 * Make the schema and resolvers *
 *********************************/

const typeDefs = gql`
	type Query {
		# A list of all boardgames the club owns according to BoardGameGeek
		boardgames: [Boardgame!]!
		# Number of board games the club owns according to BoardGameGeek. Expansions are not counted
		boardgameCount: Int!
		# List of the next events scheduled on Meetup
		events(limit: Int!): [Event!]!
		# List of photos
		photos: [String!]!
	}

	type Boardgame {
		id: Int!
		name: String!
		thumbnailUrl: String!
		minPlayers: Int!
		maxPlayers: Int!
		playingTime: Int!
		mechanics: [String!]!
		bggUrl: String!
		expands: Expands
	}

	type Expands {
		id: Int!
		name: String!
		bggUrl: String!
	}

	type Event {
		id: String!
		name: String!
		time: String!
		link: String!
	}
`;

// XXX The caching code below is hacky as fuck. Improve if you can
const gamesCache = {
	expires: new Date(0),
	result: null
};
const cachedFetchGames = fetchGames => {
	if (Date.now() < gamesCache.expires) {
		return gamesCache.result;
	}

	gamesCache.expires = new Date(Date.now() + 10 * 60 * 1000);
	gamesCache.result = fetchGames();

	return cachedFetchGames(fetchGames);
};

const resolvers = {
	Query: {
		// A list of boardgames
		boardgames: (_obj, _params, { apis }) => cachedFetchGames(apis.boardGameGeek.fetchGames),
		// Count of boardgames
		boardgameCount: (_obj, _params, { apis }) =>
			cachedFetchGames(apis.boardGameGeek.fetchGames)
				.then(R.filter(R.propEq("expands", null)))
				.then(R.length),
		// Events
		events: (_obj, { limit }, { apis }) => apis.meetup.events({ page: R.clamp(1, 20, limit) }),
		// Photos
		photos: (_obj, _params, { apis }) => apis.meetup.photos()
	}
};

/***************
 * Export them *
 ***************/

module.exports = {
	typeDefs,
	resolvers
};
