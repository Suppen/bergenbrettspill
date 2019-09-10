/**************************
 * Import important stuff *
 **************************/

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import bbkLogo from "../../../../img/logos/bbk.png";
import discordLogo from "../../../../img/logos/discord.png";
import meetupLogo from "../../../../img/logos/meetup.png";
import fbLogo from "../../../../img/logos/facebook.png";
import twitterLogo from "../../../../img/logos/twitter.png";

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
						{/* Hvor er vi? */}
						<li className="nav-item">
							<Link className={`nav-link ${props.activeTab === "where" ? "active" : ""}`} to="/where">
								Hvor er vi?
							</Link>
						</li>
						{/* Våre spill */}
						<li className="nav-item">
							<Link className={`nav-link ${props.activeTab === "games" ? "active" : ""}`} to="/games">
								Våre spill
							</Link>
						</li>
						{/* Logokonkurranse */}
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								data-toggle="dropdown"
								href="#"
								role="button"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Logokonkurranse
							</a>
							<div className="dropdown-menu">
								{/* Regler */}
								<Link className="dropdown-item" to="/logocontest">
									Logokonkurranse
								</Link>
								{/* Innlegg */}
								<Link className="dropdown-item" to="/logocontestentries">
									Innslag
								</Link>
							</div>
						</li>
						{/* Skjemaer */}
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								data-toggle="dropdown"
								href="#"
								role="button"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Skjemaer
							</a>
							<div className="dropdown-menu">
								{/* Innmeldingsskjema */}
								<a
									className="dropdown-item"
									href="https://docs.google.com/forms/d/e/1FAIpQLSe1472dT4_s4ImZnylvQFLT_nGlm7ZMBVnLQbohU5hQHpYpkg/viewform"
									target="_blank"
									rel="noopener noreferrer"
								>
									Innmeldingsskjema
								</a>
								{/* Utlån av spill */}
								<a
									className="dropdown-item"
									href="https://docs.google.com/forms/d/e/1FAIpQLSfQ9N31mhy4phvYfOvnHWeu1haBAyXujTSyYGhIswPCAPikmA/viewform"
									target="_blank"
									rel="noopener noreferrer"
								>
									Utlån av spill
								</a>
							</div>
						</li>
						{/* Finn oss på... */}
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								data-toggle="dropdown"
								href="#"
								role="button"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Finn oss på...
							</a>
							<div className="dropdown-menu">
								<a
									className="dropdown-item"
									href="https://discord.gg/BF5C9wz"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={discordLogo} alt="" />
									<span>Discord</span>
								</a>
								<a
									className="dropdown-item"
									href="https://www.meetup.com/Bergen-Brettspillklubb/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={meetupLogo} alt="" />
									<span>Meetup</span>
								</a>
								<a
									className="dropdown-item"
									href="https://www.facebook.com/bergenbrettspill/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={fbLogo} alt="" />
									<span>Facebook</span>
								</a>
								<a
									className="dropdown-item"
									href="https://twitter.com/bergenspill"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={twitterLogo} alt="" />
									<span>Twitter</span>
								</a>
							</div>
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
