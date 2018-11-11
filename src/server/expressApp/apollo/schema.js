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
		# A list of boardgames by IDs. If no IDs are given, all will be fetched
		boardgamesById(bggIds: [Int!]! = []): [Boardgame]
		# A list of boardgames matching a search string
		searchBoardgamesByTitle(searchStr: String!): [Boardgame]
		# List of all game mechanics
		gamemechanics: [Gamemechanic!]!
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
`;

/**
 * Gets a list of board games by IDs
 *
 * @param {Promise<Object>} db	Promise which resolves to the database to use
 * @param {Integer[]} bggIds	IDs of games to get. If empty, ALL games will be fetched
 *
 * @returns {Object[]}	The list of board games
 */
const getGamesByIds = (db, bggIds) =>
	db.then(db => {
		const where = R.ifElse(
			R.compose(
				R.equals(0),
				R.length
			),
			R.always(null),
			bggIds => ({
				bggId: {
					[db.Sequelize.Op.in]: bggIds
				}
			})
		)(bggIds);

		return db.Boardgames.scope("withMechanics").findAll({ where });
	});

/**
 * Gets a list of board games by a search string
 *
 * @param {Promise<Object>} db	Promise which resolves to the database to use
 * @param {String} searchStr	String to search titles for
 *
 * @returns {Object[]}	The list of board games
 */
const searchGamesByTitle = (db, searchStr) =>
	db.then(db => {
		// Hack to use `LIKE` instead of `ILIKE` for SQLite, as it does not support `ILIKE`
		const op = db.sequelize.getDialect() === "sqlite" ? db.Sequelize.Op.like : db.Sequelize.Op.iLike;

		return db.Boardgames.scope("withMechanics").findAll({
			where: {
				title: {
					[op]: `%${searchStr}%`
				}
			}
		});
	});

const resolvers = {
	Query: {
		// A list of boardgames by ID
		boardgamesById: (obj, { bggIds }, { dbs }) => getGamesByIds(dbs.bergenbrettspillklubb, bggIds),
		// A list of boardgames which titles match a search string
		searchBoardgamesByTitle: (obj, { searchStr }, { dbs }) => searchGamesByTitle(dbs.bergenbrettspillklubb, searchStr),
		// List of all game mechanics
		gamemechanics: (obj, params, { dbs }) => dbs.bergenbrettspillklubb.then(db => db.Gamemechanics.findAll())
	}
};

/***************
 * Export them *
 ***************/

module.exports = {
	typeDefs,
	resolvers
};
