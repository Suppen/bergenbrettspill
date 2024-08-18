import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema.js";

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

export default makeApolloServer;
