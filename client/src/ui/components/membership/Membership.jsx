/**************************
 * Import important stuff *
 **************************/

import React, { useState } from "react";

/****************************
 * The Membership component *
 ****************************/

const Membership = () => {
	const [language, setLanguage] = useState("no");

	return language === "no" ? renderNo(() => setLanguage("en")) : renderEn(() => setLanguage("no"));
};

const renderNo = changeLanguage => (
	<React.Fragment>
		<div className="row">
			<h1 className="col-12">Meldemskap</h1>
		</div>
		<div className="row">
			<a href="#" className="col-12" onClick={changeLanguage}>
				Change to english version
			</a>
		</div>
		<div className="row">
			<p className="col-12">
				Medlemskap i Bergen Brettspillklubb innebærer at du får delta på onsdagsspillingene. Det gir deg også stemmerett
				i avstemninger vi holder, f.eks. om hvilke spill vi skal kjøpe inn.
			</p>
			<p className="col-12">
				Man er medlem på årsbasis. Fra man betaler medlemskapet er man medlem ut kalenderåret, så betal så tidlig som
				mulig for å få mest mulig ut av medlemskapet ditt!
			</p>
		</div>
		<div className="row">
			<h2 className="col-12">Priser</h2>
		</div>
		<div className="row">
			<p className="col-12">
				Grunnet støtte fra{" "}
				<a href="http://n4f.no/" target="_blank" rel="noopener noreferrer">
					Hyperion
				</a>{" "}
				og{" "}
				<a href="https://bergen.kommune.no/" target="_blank" rel="noopener noreferrer">
					Bergen Kommune
				</a>{" "}
				er medlemskap i klubben svært billig. Prisene er:
			</p>
			<div className="col-12">
				<ul>
					<li>50 kr/år uavhengig av alder</li>
				</ul>
			</div>
			<p className="col-12">Første gang på onsdagsspilling er gratis. Deretter må du være medlem for å være med.</p>
		</div>
		<div className="row">
			<h2 className="col-12">Hvordan bli medlem?</h2>
		</div>
		<div className="row">
			<p className="col-12">Om du har vært medlem tidligere, hopp rett til betalingen.</p>
			<p className="col-12">
				Om du har bestemt deg for å bli medlem, og ikke har vært medlem tidligere, vennligst fyll ut{" "}
				<a
					href="https://docs.google.com/forms/d/e/1FAIpQLSe1472dT4_s4ImZnylvQFLT_nGlm7ZMBVnLQbohU5hQHpYpkg/viewform"
					target="_blank"
					rel="noopener noreferrer"
				>
					dette skjemaet
				</a>
				.
			</p>
		</div>
		<div className="row">
			<h2 className="col-12">Betaling</h2>
		</div>
		<div className="row">
			<p className="col-12">Vi har fire måter å ta imot betaling:</p>
			<div className="col-12">
				<ul>
					<li>
						<strong>Vipps</strong> er vår foretrukne måte å motta betalinger. I Vipps-appen, velg &quot;Send&quot;, og
						søk opp &quot;Bergen Brettspillklubb&quot; (nr. 571499).
					</li>
					<li>
						<strong>Bankoverføring</strong> er også akseptabelt. Send pengene til kontonr. 1503 74 62575 og merk
						betalingen med navnet ditt. Send gjerne en <a href="mailto:bergenbrettspill@gmail.com">e-post</a> om at du
						har gjort dette.
					</li>
					<li>
						Vi har også <strong>kortterminal</strong> i klubben. Dette krever naturligvis fysisk tilstedeværelse i
						klubben.
					</li>
					<li>
						Vi er lovpålagt å ta imot <strong>kontanter</strong>, men velg helst en av de andre løsningene om du kan.
					</li>
				</ul>
			</div>
		</div>
		<div className="row">
			<h2 className="col-12">Har jeg betalt medlemsavgiften i år?</h2>
		</div>
		<div className="row">
			<p className="col-12">
				Om du er usikker på om du har betalt medlemsavgiften i år, kom inn på{" "}
				<a href="https://discord.gg/BF5C9wz" target="_blank" rel="noopener noreferrer">
					discordserveren vår
				</a>{" "}
				og spør. Vi finner ut av det innen kort tid.
			</p>
		</div>
	</React.Fragment>
);

const renderEn = (cheapYear, changeLanguage) => (
	<React.Fragment>
		<div className="row">
			<h1 className="col-12">Membership</h1>
		</div>
		<div className="row">
			<a href="#" className="col-12" onClick={changeLanguage}>
				Bytt til norsk versjon
			</a>
		</div>
		<div className="row">
			<p className="col-12">
				Membership in Bergen Brettspillklubb means you can attend every wednesday gamenight. It also gives you voting
				rights, for example voting on which games we should buy.
			</p>
			<p className="col-12">
				Memberships are per year. It is valid from you pay the fee until the end of the calendar year, so pay as early
				as possible to get the maximum out of your membership!
			</p>
		</div>
		<div className="row">
			<h2 className="col-12">Prices</h2>
		</div>
		<div className="row">
			<p className="col-12">
				Due to support from{" "}
				<a href="http://n4f.no/" target="_blank" rel="noopener noreferrer">
					Hyperion
				</a>{" "}
				and{" "}
				<a href="https://bergen.kommune.no/" target="_blank" rel="noopener noreferrer">
					Bergen Kommune
				</a>{" "}
				a membership is very cheap. The prices are:
			</p>
			<div className="col-12">
				<ul>
					<li>50 kr/year independent of age</li>
				</ul>
			</div>
			<p className="col-12">The first wednesday game night is free. After that, you must be a member to attend.</p>
		</div>
		<div className="row">
			<h2 className="col-12">How do I become a member?</h2>
		</div>
		<div className="row">
			<p className="col-12">If you have been a member earlier, skip straight to the payment section.</p>
			<p className="col-12">
				If you have decided to become a member, and have not previously been a member, please fill out{" "}
				<a
					href="https://docs.google.com/forms/d/e/1FAIpQLSe1472dT4_s4ImZnylvQFLT_nGlm7ZMBVnLQbohU5hQHpYpkg/viewform"
					target="_blank"
					rel="noopener noreferrer"
				>
					this form
				</a>
				.
			</p>
		</div>
		<div className="row">
			<h2 className="col-12">Payment</h2>
		</div>
		<div className="row">
			<p className="col-12">We have four ways to take payment:</p>
			<div className="col-12">
				<ul>
					<li>
						<strong>Vipps</strong> is our preferred way to receive payment. In the Vipps app, click &quot;Send&quot;,
						and search for &quot;Bergen Brettspillklubb&quot; (nr. 571499).
					</li>
					<li>
						<strong>Bank transaction</strong> is also acceptable. Send the money to account number 1503 74 62575 and
						mark the payment with your name. Please send an <a href="mailto:bergenbrettspill@gmail.com">e-mail</a>{" "}
						telling us you&rsquo;ve done this.
					</li>
					<li>
						We have a <strong>card terminal</strong> in the club. This of course means you need to be physically present
						to pay
					</li>
					<li>
						We are required by law to take <strong>cash</strong>, but please use one of the other solutions if you can.
					</li>
				</ul>
			</div>
		</div>
		<div className="row">
			<h2 className="col-12">Have I payed my membership this year?</h2>
		</div>
		<div className="row">
			<p className="col-12">
				If you are not sure whether or not you have paid the membership fee this year, please come to{" "}
				<a href="https://discord.gg/BF5C9wz" target="_blank" rel="noopener noreferrer">
					discord server
				</a>{" "}
				and ask. We will find out within a short time.
			</p>
		</div>
	</React.Fragment>
);

/*************
 * Export it *
 *************/

export { Membership };
