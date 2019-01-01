/**************************
 * Import important stuff *
 **************************/

import React from "react";

import map from "../../../img/directions.png";
import vid from "../../../vid/directions.webm";

/****************************
 * The Directions component *
 ****************************/

/**
 * URL to the map service
 *
 * @type {String}
 *
 * @private
 */
const mapUrl =
	"https://www.google.no/maps/dir/Byparken+bybanestopp,+Starvhusgaten,+Bergen/Klosteret+2,+5005+Bergen/@60.3929216,5.3192144,17z/data=!4m14!4m13!1m5!1m1!1s0x463cfea84eb9d69b  :0x55ba049ec166cc2b!2m2!1d5.3255739!2d60.39202!1m5!1m1!1s0x463cfc034d788dd1:0xbe548cc971a7bc78!2m2!1d5.3156027!2d60.3947072!3e2?hl=en";

function Directions() {
	return (
		<div>
			<h2 className="row">
				<span className="col-12">Hvor er vi?</span>
			</h2>
			<div className="row">
				<div className="col-12">
					<p>
						Vi holder til i 2. etasje i Nordnes Bydelshus, ca. 5 minutter gangavstand fra Torgallmenningen. Ta til
						venstre med en gang du kommer inn døren, gå opp trappen, og finn rommet som heter &quot;Kursrom&quot; på
						høyre side
					</p>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 col-lg-6 mb-3">
					<a target="_blank" href={mapUrl} rel="noopener noreferrer">
						<img className="w-100" src={map} alt="Veibeskrivelse" />
					</a>
				</div>
				<div className="col-md-12 col-lg-6 mb-3">
					<video className="w-100" preload="metadata" controls>
						<source src={`${vid}#t=0`} />
					</video>
				</div>
			</div>
		</div>
	);
}
//						<source src="/vid/directions.webm#t=0" />

/*************
 * Export it *
 *************/

export default Directions;
export { Directions };
