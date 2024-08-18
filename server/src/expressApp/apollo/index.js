"use strict";

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");

/***************************
 * Make the setup function *
 ***************************/

const makeApolloServer = (settings, apis) => {
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => ({
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
