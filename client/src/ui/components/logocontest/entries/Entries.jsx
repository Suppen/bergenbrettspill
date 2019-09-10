/**************************
 * Import important stuff *
 **************************/

import React from "react";
import * as R from "ramda";
import { Link } from "react-router-dom";

/*********************
 * Import the images *
 *********************/

import kjetil1 from "../../../../img/logocontestEntries/Kjetil 1.png";
import kjetil2 from "../../../../img/logocontestEntries/Kjetil 2.png";
import anna from "../../../../img/logocontestEntries/Anna.png";
import floyd from "../../../../img/logocontestEntries/Floyd.png";
import juni from "../../../../img/logocontestEntries/Juni.png";
import watjara from "../../../../img/logocontestEntries/Watjara.png";

/********************
 * Make the entries *
 ********************/

const entries = [
	{
		img: kjetil1,
		text: "En fin, blå logo som viser det mest bergenske været som finnes!"
	},
	{
		img: kjetil2,
		text: "Paraplyer må vel være det mest bergenske verktøyet?"
	},
	{
		img: anna,
		text: "Her har vi fire varianter av samme logo, ment til bruk i forskjellige størrelser!"
	},
	{
		img: floyd,
		text: "Tre grove skisser som kan bli fine logoer med litt arbeid!"
	},
	{
		img: juni,
		text: "En interessant vri. Byggeklosser som kan settes sammen til on-demand!"
	},
	{
		img: watjara,
		text: "Enkelt og stilrent design!"
	}
];

/*************************
 * The Entries component *
 *************************/

function Entries() {
	// Shuffle the entries
	const clone = R.clone(entries);
	const shuffledEntries = R.range(0, R.length(entries)).map(() => {
		const i = Math.floor(Math.random() * clone.length);
		return R.head(clone.splice(i, 1));
	});

	return (
		<React.Fragment>
			<div className="row">
				<div className="col-12">
					<h1>Innslag til logokonkurransen</h1>
					<p>
						Det har kommet inn flere innlegg enn forventet til logokonkurransen vår; hele {entries.length} stykker!
						Disse vises under, i tilfeldig rekkefølge. Hvem som har sendt dem inn holdes hemmelig inntil en vinner er
						kåret.
					</p>
					<p>Merk at logoene ikke nødvendigvis er ferdige; de kan fortsatt utbedres etter at vi har kåret en vinner.</p>
					<p>
						Vinneren bestemmes ved avstemning. Stemmeperioden begynner{" "}
						<time dateTime="2019-09-18T00:00:00+0200">onsdag 18. september kl. 00:00</time> og stenger{" "}
						<time dateTime="2019-09-25T23:59:59+0200">onsdag 25. september kl. 23:59</time>. Vinneren annonseres kort
						tid etter at valget stenger.
					</p>
					<p>
						Se også <Link to="/logocontest">reglene</Link>
					</p>
					<div className="logocontest-entries row">
						{shuffledEntries.map((e, i) => (
							<div key={i} className="logocontest-entry col-lg-4 col-sm-6 col-xs-12 mb-4">
								<div className="card card-body">
									<img src={e.img} alt="" />
									<p>{e.text}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
/*************
 * Export it *
 *************/

export { Entries };
