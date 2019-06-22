/**************************
 * Import important stuff *
 **************************/

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/*****************************
 * The Description component *
 *****************************/

function Description(props) {
	const isClosed =
		new Date() > new Date("2019-06-26T22:30:00+0200") && new Date() < new Date("2019-07-08T00:00:00+0200");

	return (
		<div className="mt-4">
			{isClosed ? (
				<div className="alert alert-info">
					<strong>Bergen Brettspillklubb har for øyeblikket sommerstengt</strong>. Neste onsdagsspilling er 14. august.
					Vi sees da!
				</div>
			) : null}
			<p>
				Liker du brettspill? Vi samles hver onsdag på <Link to="/where">Nordnes Bydelshus</Link> og spiller alt mulig
				rart av brettspill. Vi har <Link to="/games">{props.gamecount} spill</Link> selv, og medlemmer tar ofte med egne
				spill
			</p>
			<p>
				Ingen erfaring med brettspill er nødvendig. Vi forklarer alle regler før vi begynner et spill, så ikke vær redd
				for å prøve noe nytt!
			</p>
			<p>Vi spiller brettspill hver onsdag hele året med unntak av påske, hele Juli, og røde dager</p>
			<p>
				Første gang er gratis. Deretter koster medlemskap bare 50/150* kr. for hele kalenderåret! Nedre aldersgrense er
				14 år. Det er ingen øvre aldersgrense
			</p>
			<p>* 50 kr. til og med året du fyller 25 år, 150 etter</p>
		</div>
	);
}

Description.propTypes = {
	gamecount: PropTypes.number.isRequired
};

Description.defaultProps = {
	gamecount: 0
};

/*************
 * Export it *
 *************/

export { Description };
