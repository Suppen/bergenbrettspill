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
import { LogoContest } from "../logocontest";
import { Entries } from "../logocontest/entries";
import { Membership } from "../membership";

/**************************
 * Make the apollo client *
 **************************/

const client = new ApolloClient();

/************************
 * The Router component *
 ************************/

function Router() {
	return (
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
				<Route
					exact
					path="/logocontestentries"
					component={() => (
						<DefaultLayout activeTab="logocontest">
							<Entries />
						</DefaultLayout>
					)}
				/>
				<Route
					exact
					path="/logocontest"
					component={() => (
						<DefaultLayout activeTab="logocontest">
							<LogoContest />
						</DefaultLayout>
					)}
				/>
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
}

/*************
 * Export it *
 *************/

export default Router;
export { Router };
