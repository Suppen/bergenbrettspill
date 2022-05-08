import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

interface DescriptionProps {
	gameCount: number | null;
}

const Description = ({ gameCount }: DescriptionProps) => (
	<div className="mt-4">
		<p>
			Liker du brettspill? Vi samles hver onsdag på <Link to="/where">Nordnes Bydelshus</Link> og spiller alt
			mulig rart av brettspill. Vi har{" "}
			<Link to="/games">{gameCount === null ? "(beregner...)" : gameCount} spill</Link> selv, og medlemmer tar
			ofte med egne spill
		</p>
		<p>
			Ingen erfaring med brettspill er nødvendig. Vi forklarer alle regler før vi begynner et spill, så ikke vær
			redd for å prøve noe nytt!
		</p>
		<p>
			Se listen til høyre for våre planlagte spilldager. Vi spiller vanligvis hver onsdag med unntak av røde dager
			og hele Juli
		</p>
		<p>
			Første gang er gratis. Deretter koster medlemskap bare 50 kr. for hele kalenderåret! Nedre aldersgrense er
			14 år. Det er ingen øvre aldersgrense
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
