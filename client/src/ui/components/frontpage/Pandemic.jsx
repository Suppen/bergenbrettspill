/**************************
 * Import important stuff *
 **************************/

import React from "react";

/**************************
 * The Pandemic component *
 **************************/

const Pandemic = () => (
	<div className="row mt-4">
		<div className="col-12">
			<div className="alert alert-primary">
				<h2>Antismittetiltak</h2>
				<p>Frem til smittefaren er over blir det dessverre en del endringer. Det viktigste er:</p>
				<ul>
					<li>Det settes en grense på ca. 30 deltakere. Nøyaktig grense blir en skjønnsmessig vurdering hver onsdag. Personer som har meldt seg på på Meetup vil bli prioritert dersom grensen nås.</li>
					<li>Man må registrere seg med navn og telefonnummer når man kommer</li>
					<li>Det skal til enhver tid holdes minst en meter mellom alle deltakere</li>
					<li>Munnbind er anbefalt, men ikke påbudt</li>
					<li>Det anbefales å holde seg til egne brikker, og å ikke ta på andres brikker</li>
					<li>Det settes ut håndsprit på hvert bord. Bruk dette ofte. Såpe og vann er tilgjengelig på toalettene</li>
					<li>Om man skal spise eller drikke, må man trekke seg litt vekk fra bordet</li>
					<li>Kjøkkenet skal ikke brukes</li>
				</ul>
				<p>Følg lokale og nasjonale retningslinjer. Brettspill er en sosial aktivitet, og gjennomføres på egen risiko.</p>
				<p>Om du får symptomer eller påvist covid-19 innen to uker etter spilling, gi beskjed til styret. Kontaktdetaljer finnes øverst på nettsiden, under "Finn oss på...".</p>
			</div>
		</div>
	</div>
);

/*************
 * Export it *
 *************/

export default Pandemic;
export { Pandemic };
