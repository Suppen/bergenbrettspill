/**************************
 * Import important stuff *
 **************************/

import React from "react";
import { BrowserRouter as ReactRouter, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

/*************************
 * Import the components *
 *************************/

import { DefaultLayout } from "../layouts/default";

import { Frontpage } from "../frontpage";
import { Games } from "../games";
import { Directions } from "../directions";
import { Membership } from "../membership";

/**************************
 * Make the apollo client *
 **************************/

const client = new ApolloClient();

/************************
 * The Router component *
 ************************/

const Router = () => (
	<ReactRouter>
		<ApolloProvider client={client}>
			<Route
				exact
				path="/"
				component={() => (
					<DefaultLayout>
						<Frontpage />
					</DefaultLayout>
				)}
			/>
			<Route
				exact
				path="/games"
				component={() => (
					<DefaultLayout activeTab="games">
						<Games />
					</DefaultLayout>
				)}
			/>
			<Route
				exact
				path="/where"
				component={() => (
					<DefaultLayout activeTab="where">
						<Directions />
					</DefaultLayout>
				)}
			/>
			{/* See previous comment */}
			<Route
				exact
				path="/membership"
				component={() => (
					<DefaultLayout activeTab={"membership"}>
						<Membership />
					</DefaultLayout>
				)}
			/>
		</ApolloProvider>
	</ReactRouter>
);

/*************
 * Export it *
 *************/

export default Router;
export { Router };
