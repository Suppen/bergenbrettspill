import express from "express";
import makeApolloServer from "./apollo/index.js";

/***************************
 * Make the setup function *
 ***************************/

/**
 * Sets up the express app
 *
 * @param {Object} settings	Settings for the application
 * @param {Object} apis	The API object to use
 *
 * @returns {Object}	The express app
 */
const setupExpressApp = async (settings, apis) => {
	// Initialize the app object
	const app = express();

	// Add GraphQL to it
	const apolloServer = makeApolloServer(settings, apis);
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	return app;
};

export default setupExpressApp;
