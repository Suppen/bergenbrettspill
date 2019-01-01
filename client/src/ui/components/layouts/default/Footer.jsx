/**************************
 * Import important stuff *
 **************************/

import React from "react";

import hyperionLogo from "../../../../img/logos/hyperion.png";
import bkLogo from "../../../../img/logos/bergenkommune.png";

/************************
 * The Footer component *
 ************************/

function Footer() {
	return (
		<footer className="row justify-content-center pb-4">
			<p className="col-12">Sponset av</p>
			<div className="col-12">
				<a href="https://n4f.no" target="_blank" rel="noopener noreferrer" className="mr-3 mb-2">
					<img src={hyperionLogo} alt="Hyperion: Norsk Forening for Fantastiske Fritidsinteresser" />
				</a>
				<a href="https://bergen.kommune.no" target="_blank" rel="noopener noreferrer" className="mr-3 mb-2">
					<img src={bkLogo} alt="Bergen Kommune" />
				</a>
			</div>
		</footer>
	);
}

/*************
 * Export it *
 *************/

export default Footer;
export { Footer };
