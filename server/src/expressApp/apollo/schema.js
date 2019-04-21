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
		# A list of boardgames all boardgames
		boardgames: [Boardgame!]!
		# List of all game mechanics
		gamemechanics: [Gamemechanic!]!
		# List of the ten next events
		events(limit: Int!): [Event!]!
		# List of photos
		photos: [String!]!
	}

	type Boardgame {
		bggId: Int!
		bggUrl: String!
		thumbnailUrl: String
		imageUrl: String
		title: String
		minPlayers: Int
		maxPlayers: Int
		playingTime: Int
		expands: Boardgame
		mechanics: [Gamemechanic]
	}

	type Gamemechanic {
		id: Int!
		name: String!
	}

	type Event {
		id: String!
		name: String!
		time: String!
		link: String!
	}
`;

/**
 * Gets a list of all board games
 *
 * @param {Promise<Object>} db	Promise which resolves to the database to use
 *
 * @returns {Object[]}	The list of board games
 */
const getGames = db => db.then(db => db.Boardgames.scope("withMechanics").findAll());

const resolvers = {
	Query: {
		// A list of boardgames by ID
		boardgames: (obj, params, { dbs }) => getGames(dbs.bergenbrettspillklubb),
		// List of all game mechanics
		gamemechanics: (obj, params, { dbs }) => dbs.bergenbrettspillklubb.then(db => db.Gamemechanics.findAll()),
		// Events
		events: (obj, { limit }, { apis }) => apis.meetup.events({ page: R.clamp(1, 20, limit) }),
		// Photos
		photos: (obj, params, { apis }) => apis.meetup.photos()
	}
};

/***************
 * Export them *
 ***************/

module.exports = {
	typeDefs,
	resolvers
};
