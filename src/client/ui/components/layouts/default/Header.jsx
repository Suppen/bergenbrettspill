/**************************
 * Import important stuff *
 **************************/

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import bbkLogo from "../../../../img/logos/bbk.png";
import meetupLogo from "../../../../img/logos/meetup.png";
import fbLogo from "../../../../img/logos/facebook.png";

/************************
 * The Header component *
 ************************/

function Header(props) {
	return (
		<header className="row">
			<Link className="col-12" to="/">
				<h1>
					<img className="logo" src={bbkLogo} alt="Bergen Brettspillklubb" />
					Bergen Brettspillklubb
				</h1>
			</Link>
			<nav className="navbar navbar-expand-sm navbar-light bg-faded col-12">
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#nav-content"
					aria-controls="nav-content"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div id="nav-content" className="collapse navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link className={`nav-link ${props.activeTab === "games" ? "active" : ""}`} to="/games">
								Liste over spill
							</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${props.activeTab === "where" ? "active" : ""}`} to="/where">
								Hvor er vi?
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav">
						<li className="nav-item">
							<a
								className="nav-link"
								href="https://www.meetup.com/Bergen-Brettspillklubb/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={meetupLogo} alt="" />
								Meetup
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								href="https://www.facebook.com/bergenbrettspill/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={fbLogo} alt="" />
								Facebook
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

Header.propTypes = {
	activeTab: PropTypes.string
};

/*************
 * Export it *
 *************/

export default Header;
export { Header };
