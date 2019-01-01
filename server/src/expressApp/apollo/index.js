"use strict";

/**************************
 * Import important stuff *
 **************************/

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");

/***************************
 * Make the setup function *
 ***************************/

const makeApolloServer = (settings, dbs, apis) => {
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => ({
			dbs,
			apis,
			settings
		})
	});

	return apolloServer;
};

/*************
 * Export it *
 *************/

module.exports = makeApolloServer;
