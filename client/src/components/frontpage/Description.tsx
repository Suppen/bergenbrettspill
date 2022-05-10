import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

interface DescriptionProps {
	gameCount: number | null;
}

const Description = ({ gameCount }: DescriptionProps) => (
	<div className="mt-4">
		<p>
			Vi møtes hver onsdag på <Link to="where">Nordnes Bydelshus</Link> mellom kl 17:30 og 23:00 for hyggelig
			samspill, med unntak av jul, påske og hele juli måned. Den første spillkvelden er gratis, deretter må man{" "}
			<Link to="/membership">være medlem</Link> for å delta. Medlemskontingenten i klubben er 50 kroner per
			kalenderår. Våre arrangementer er rusfrie, og åpne for alle over 14 år.
		</p>
		<p>
			Fra kl. 17:30 kan du spille småspill, mingle og stemme på hvilket hovedspill du vil spille. Kl. 18:00
			avsluttes avstemningen og spillerne fordeles på hovedspillene. Kommer du etter kl. 18:00 er du derfor ikke
			sikret å være med på et spill.
		</p>
		<p>
			Ikke vær redd for å prøve noe du ikke har spilt før. Vi går alltid gjennom spillereglene enten man er ny
			eller noen bare trenger en oppfriskning.
		</p>
		<p>
			Klubben har{" "}
			<Link to="/games">{gameCount === null ? "en betydelig spillsamling" : `${gameCount} spill`}</Link> selv, og
			det er fritt frem for å ta med seg egne spill hjemmefra.
		</p>
		<p>
			Det er også mulig å låne med seg et av klubben sine spill mellom spillkvelder, så lenge det leveres tilbake
			ved neste spillkveld. Ta kontakt med et styremedlem for å avtale lån.
		</p>
	</div>
);

const DescriptionContainer = (): JSX.Element => {
	const { data } = useQuery<{ boardgameCount: number }>(
		gql`
			query {
				boardgameCount
			}
		`
	);

	return <Description gameCount={data?.boardgameCount ?? null} />;
};

export default DescriptionContainer;
export { Description, DescriptionContainer };
