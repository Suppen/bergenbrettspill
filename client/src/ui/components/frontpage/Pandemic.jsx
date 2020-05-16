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
				<h2>Klubben er nå åpen igjen</h2>
				<p>
					Etter over to måneder i isolasjon har vi endelig fått lov til å begynne å åpne igjen! Første spilling blir
					onsdag 20. mai.
				</p>
				<p>Det blir naturligvis noen endringer frem til smittefaren er over. Det viktigste er:</p>
				<ul>
					<li>
						Det er <strong>obligatorisk påmelding</strong>¹ gjennom{" "}
						<a href="https://www.meetup.com/Bergen-Brettspillklubb/" target="_blank" rel="noopener noreferrer">
							Meetup
						</a>{" "}
						(se også eventlisten til høyre). Personer som ikke har meldt seg på vil bli bortvist
					</li>
					<li>Det settes en grense på 16 deltakere</li>
					<li>Vi har ikke plass til mer enn 4 grupper. Det blir derfor 4 spillere pr. spill</li>
					<li>
						Hvilket spill man skal spille og hvem man skal spille med må være avtalt på forhånd. Diskusjonsfeltet på
						Meetup skal brukes til dette²
					</li>
					<li>Én person skal være ansvarlig for hvert spill, og sette opp og pakke det ned ved start og slutt</li>
				</ul>
				<p>Andre tiltak:</p>
				<ul>
					<li>Det skal til enhver tid være minimum 1 meter mellom alle deltakere</li>
					<li>Hvert spill skal spilles på minst to bord som er satt sammen, uavhengig av spillets størrelse</li>
					<li>Ikke ta på andres brikker. Hold deg til dine egne</li>
					<li>Det settes ut håndsprit på hvert bord. Bruk dette ofte. Såpe og vann er tilgjengelig på toalettene</li>
					<li>Ingen spising i lokalet</li>
					<li>Kjøkkenet skal ikke brukes</li>
					<li>Personer som har vært i utlandet de siste 14 dager skal være i karantene og får ikke komme</li>
					<li>Personer i risikogruppen frarådes å delta</li>
					<li>Personer med samfunnskritiske oppgaver frarådes å delta</li>
					<li>Personer med symptomer vil bli bortvist</li>
					<li>Personer som ikke overholder reglene vil bli bortvist</li>
				</ul>
				<p>Brettspill er en sosial aktivitet, og gjennomføres på egen risiko</p>
				<p>
					Merk at dette også markerer slutten på vår Tabletop Simulator Giveaway og offisielle onsdagsspillinger gjennom
					Tabletop Simulator.
				</p>
				<p>
					¹ Husk å melde avbud om du ikke kan likevel! Meetup har venteliste. Om man setter seg på denne, vil man
					automatisk få plass om noen melder avbud. Personer på ventelisten vil også prioriteres uken etter. Melder du
					deg på og ikke dukker opp, må du stå over uken etter
				</p>
				<p>² Legg inn spillforslag som kommentar på Meetup. Svar på kommentaren for å melde deg på</p>
			</div>
		</div>
	</div>
);

/*************
 * Export it *
 *************/

export default Pandemic;
export { Pandemic };
