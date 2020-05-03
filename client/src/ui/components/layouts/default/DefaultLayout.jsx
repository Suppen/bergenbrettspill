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

const DefaultLayout = ({ activeTab, children }) => (
	<div className="container default-layout">
		<Header activeTab={activeTab} />
		<main>{children}</main>
		<Footer />
	</div>
);

DefaultLayout.propTypes = {
	activeTab: PropTypes.string,
	children: PropTypes.element.isRequired
};

/*************
 * Export it *
 *************/

export default DefaultLayout;
export { DefaultLayout };
