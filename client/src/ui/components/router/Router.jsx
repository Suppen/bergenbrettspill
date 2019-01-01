/**************************
 * Import important stuff *
 **************************/

import React from "react";
import { BrowserRouter as ReactRouter, Route } from "react-router-dom";

/*************************
 * Import the components *
 *************************/

import { DefaultLayout } from "../layouts/default";

import { Frontpage } from "../frontpage";
import { GameTable } from "../games";
import { Directions } from "../directions";

/************************
 * The Router component *
 ************************/

function Router() {
	return (
		<ReactRouter>
			<React.Fragment>
				<Route exact path="/" component={Home} />
				<Route path="/games" component={Games} />
				<Route path="/where" component={Where} />
			</React.Fragment>
		</ReactRouter>
	);
}

/********************************
 * Make some wrapper components *
 ********************************/

function Home() {
	return (
		<DefaultLayout>
			<Frontpage />
		</DefaultLayout>
	);
}

function Games() {
	return (
		<DefaultLayout activeTab="games">
			<GameTable />
		</DefaultLayout>
	);
}

function Where() {
	return (
		<DefaultLayout activeTab="where">
			<Directions />
		</DefaultLayout>
	);
}

/*************
 * Export it *
 *************/

export default Router;
export { Router };
