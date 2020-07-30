/**************************
 * Import important stuff *
 **************************/

import React from "react";

/**************************
 * The Vacation component *
 **************************/

const Vacation = () => (
	<div className="row mt-4">
		<div className="col-12">
			<div className="alert alert-primary">
				<h2>Klubben har ferie</h2>
				<p>Nordnes bydelshus er stengt i hele juli, og vi kan derfor ikke bruke lokalene våre</p>
				<p>
					Første onsdagsspilling etter ferien er 5. august, og forhåpentligvis tillater koronasituasjonen at vi kan ha
					en åpen spilldag lørdag 8. august.
				</p>
				<p>
					Vi prøver å få til minst en spilldag i løpet av sommeren i leide lokaler. Følg med på{" "}
					<a href="https://discord.gg/BF5C9wz" target="_blank" rel="noopener noreferrer">
						Discord
					</a>{" "}
					og{" "}
					<a href="https://www.facebook.com/bergenbrettspill/" target="_blank" rel="noopener noreferrer">
						Facebook
					</a>{" "}
					for oppdateringer!
				</p>
			</div>
		</div>
	</div>
);

/*************
 * Export it *
 *************/

export default Vacation;
export { Vacation };
