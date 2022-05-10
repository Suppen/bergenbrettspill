import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "../layouts/default";

const Membership = (): JSX.Element => {
	const [language, setLanguage] = useState("no");

	return (
		<DefaultLayout>
			{language === "no" ? renderNo(() => setLanguage("en")) : renderEn(() => setLanguage("no"))}
		</DefaultLayout>
	);
};

const renderNo = (changeLanguage: () => void): JSX.Element => (
	<React.Fragment>
		<div className="card mt-3">
			<h2 className="card-header">For å bli medlem</h2>
			<div className="card-body">
				<ul>
					<li>
						Vipps 50 kr. til Bergen Brettspillklubb (#571499). Se nedenfor for alternative betalingsmåter.
					</li>
					<li>
						Fyll ut{" "}
						<strong>
							<a
								href="https://docs.google.com/forms/d/e/1FAIpQLSe1472dT4_s4ImZnylvQFLT_nGlm7ZMBVnLQbohU5hQHpYpkg/viewform"
								target="_blank"
								rel="noopener noreferrer"
							>
								dette skjemaet
							</a>
						</strong>
					</li>
				</ul>
			</div>
		</div>
		<section className="row mt-3">
			<div className="col">
				<FontAwesomeIcon icon={faLanguage} className="me-1" />
				<a href="#" onClick={changeLanguage}>
					Change to english version
				</a>
			</div>
		</section>
		<section className="row mt-3">
			<div className="col">
				<h2>Fordeler ved medlemskap</h2>
				<p>
					Som medlem i Bergen Brettspillklubb får du følgende goder:
					<ul>
						<li>Tilgang til alle våre onsdagsspillinger og andre hendelser</li>
						<li>
							Mulighet til å låne våre <Link to="/games">mange spill</Link>
						</li>
						<li>Stemmerett i våre avgjørelser, bl.a. hvilke spill som skal kjøpes</li>
						<li>Stemme-, tale- og forslagsrett på våre møter, hovedsaklig årsmøtet</li>
					</ul>
				</p>
			</div>
		</section>
		<section className="row">
			<div className="col">
				<h2>Priser</h2>
				<p>
					Grunnet støtte fra{" "}
					<a href="https://n4f.no/" target="_blank" rel="noopener noreferrer">
						Hyperion
					</a>{" "}
					og{" "}
					<a href="https://bergen.kommune.no/" target="_blank" rel="noopener noreferrer">
						Bergen Kommune
					</a>{" "}
					er medlemskap i klubben svært billig. Prisene er:
				</p>
				<ul>
					<li>50 kr/år uavhengig av alder</li>
				</ul>
				<p>Første gang på onsdagsspilling er gratis. Deretter må du være medlem for å være med.</p>
			</div>
		</section>
		<section>
			<h2>Betaling</h2>
			<p>Vi har fire måter å ta imot betaling:</p>
			<ul>
				<li>
					<strong>Vipps</strong> er vår foretrukne måte å motta betalinger. I Vipps-appen, velg
					&quot;Send&quot;, og søk opp &quot;Bergen Brettspillklubb&quot; (nr. 571499).
				</li>
				<li>
					<strong>Bankoverføring</strong> er også akseptabelt. Send pengene til kontonr. 1503 74 62575 og merk
					betalingen med navnet ditt. Send gjerne en <a href="mailto:bergenbrettspill@gmail.com">e-post</a> om
					at du har gjort dette.
				</li>
				<li>
					Vi har også <strong>kortterminal</strong> i klubben. Dette krever naturligvis fysisk tilstedeværelse
					i klubben.
				</li>
				<li>
					Vi er lovpålagt å ta imot <strong>kontanter</strong>, men velg helst en av de andre løsningene om du
					kan.
				</li>
			</ul>
		</section>
		<p>
			Man er medlem på årsbasis. Fra man betaler medlemskapet er man medlem ut kalenderåret, så betal så tidlig
			som mulig for å få mest mulig ut av medlemskapet ditt!
		</p>
	</React.Fragment>
);

const renderEn = (changeLanguage: () => void): JSX.Element => (
	<React.Fragment>
		<div className="card mt-3">
			<h2 className="card-header">To become a member</h2>
			<div className="card-body">
				<ul>
					<li>
						Vipps 50 kr. to Bergen Brettspillklubb (#571499). See below for alternative payment methods.
					</li>
					<li>
						Fill out{" "}
						<strong>
							<a
								href="https://docs.google.com/forms/d/e/1FAIpQLSe1472dT4_s4ImZnylvQFLT_nGlm7ZMBVnLQbohU5hQHpYpkg/viewform"
								target="_blank"
								rel="noopener noreferrer"
							>
								this form
							</a>
						</strong>
					</li>
				</ul>
			</div>
		</div>
		<section className="row mt-3">
			<div className="col">
				<FontAwesomeIcon icon={faLanguage} className="me-1" />
				<a href="#" onClick={changeLanguage}>
					Bytt til norsk versjon
				</a>
			</div>
		</section>
		<section className="row mt-3">
			<div className="col">
				<h2>Advantages of membership</h2>
				<p>
					As a member of Bergen Brettspillklubb, you get the following:
					<ul>
						<li>Access to all our wednesday game nights, and other events</li>
						<li>
							Possiblity to borrow our <Link to="/games">many games</Link>
						</li>
						<li>Right to vote on our decisions, like what games we should buy</li>
						<li>Voting, suggestion, and speaking rights at our meetings, mainly our annual meeting</li>
					</ul>
				</p>
			</div>
		</section>
		<section className="row">
			<div className="col">
				<h2>Prices</h2>
				<p>
					Due to support from{" "}
					<a href="https://n4f.no/" target="_blank" rel="noopener noreferrer">
						Hyperion
					</a>{" "}
					and{" "}
					<a href="https://bergen.kommune.no/" target="_blank" rel="noopener noreferrer">
						Bergen Kommune
					</a>{" "}
					membership is very cheap. The prices are:
				</p>
				<ul>
					<li>50 kr/year independent of your age</li>
				</ul>
				<p>First time on a wednesday game night is free. After that, you must be a member to attend.</p>
			</div>
		</section>
		<section>
			<h2>Payment</h2>
			<p>We have four ways of receiving payment:</p>
			<ul>
				<li>
					<strong>Vipps</strong> is our preferred way to receive payment. In the Vipps app, click
					&quot;Send&quot; and search for &quot;Bergen Brettspillklubb&quot; (nr. 571499). &quot;Send&quot;,
					og søk opp &quot;Bergen Brettspillklubb&quot; (nr. 571499).
				</li>
				<li>
					<strong>Bank transactions</strong> are also acceptable. Send the money to account number 1503 74
					62575 and mark your payment with your name. Please send us{" "}
					<a href="mailto:bergenbrettspill@gmail.com">an email</a> if you do this.
				</li>
				<li>
					We have a <strong>Card terminal</strong> in the club. This naturally requires you to be physically
					present to pay.
				</li>
				<li>
					We are required by law to accept <strong>Cash</strong>, but please choose another payment method if
					you can.
				</li>
			</ul>
		</section>
		<p>
			Membership is paid on a yearly basis. You are a member from the moment you pay until the end of the calendar
			year, so pay as early as possible to get the most out of your membership!
		</p>
	</React.Fragment>
);

export { Membership };
