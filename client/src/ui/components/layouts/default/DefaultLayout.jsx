/**************************
 * Import important stuff *
 **************************/

import React from "react";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import PropTypes from "prop-types";

/*******************************
 * The DefaultLayout component *
 *******************************/

function DefaultLayout(props) {
	return (
		<div className="container default-layout">
			<Header activeTab={props.activeTab} />
			<main>{props.children}</main>
			<Footer />
		</div>
	);
}

DefaultLayout.propTypes = {
	activeTab: PropTypes.string,
	children: PropTypes.element.isRequired
};

/*************
 * Export it *
 *************/

export default DefaultLayout;
export { DefaultLayout };
