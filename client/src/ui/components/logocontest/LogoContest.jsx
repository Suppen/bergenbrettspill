/**************************
 * Import important stuff *
 **************************/

import React from "react";

/*****************************
 * The LogoContest component *
 *****************************/

function LogoContest() {
	return (
		<React.Fragment>
			<div className="row">
				<div className="col-md-8 col-sm-12">
					<div className="row">
						<div className="col-12">
							<h1>Logokonkurranse</h1>
							<p>
								Bergen Brettspillklubb skal ha ny logo, og styret ønsker at alle som vil kan sende inn bidrag. Vi er en
								demokratisk klubb tross alt!
							</p>
							<p>
								Vinnerlogoen vil bli brukt av klubben i alle offisielle sammenhenger, bl.a. på nettsiden, bannere,
								reklame, dokumenter, ...
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Hvem kan delta?</h2>
							<p>
								Hvem som helst kan delta. Det er ikke krav om å være medlem i klubben, eller å ha betalt årskontigent.
							</p>
							<p>Styremedlemmer kan delta, men ikke vinne premier.</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Premier</h2>
							<p>
								<strong>1. plass</strong> får et gavekort på 400 kr. hos Outland. Logoen vil bli brukt av Bergen
								Brettspillklubb i alle offisielle sammenhenger.
							</p>
							<p>
								<strong>2. plass</strong> får et gavekort på 200 kr. hos Outland.
							</p>
							<p>
								<strong>3. plass</strong> får gratis medlemskap i Bergen Brettspillklubb i 2020.
							</p>
							<p className="text-muted">
								Dersom premien er upraktisk for vinneren, f.eks. vedkommende bor i en annen by, kan alternativer
								diskuteres.
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Kåring av vinner</h2>
							<p>
								Vinneren av konkurransen kåres ved avstemning. Alle medlemmer som har betalt årsavgiften har stemmerett.
								Fullt navn må registreres sammen med stemmen, og kun siste stemme teller.
							</p>
							<p>Avstemningsperioden vil være en uke, og åpner en uke etter leveringsfristen.</p>
							<p>Alle logoene vil vises på nettsiden vår etter at leveringsfristen er gått ut.</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Tekniske krav</h2>
							<div className="col-12">
								<h3>Format</h3>
								<p>Tillatte filformater formater på logoen som leveres er SVG og PNG</p>
								<p>
									<a
										href="https://en.wikipedia.org/wiki/Scalable_Vector_Graphics"
										target="_blank"
										rel="noopener noreferrer"
									>
										SVG
									</a>{" "}
									er et vektorformat som støttes av de fleste vektorbaserte grafikkbehandlingsprogrammer. Ved levering
									som SVG skal det leveres én .svg-fil. Det er viktig at den ser bra ut ved alle de listede
									oppløsningene.
								</p>
								<p>
									<a
										href="https://docs.google.com/forms/d/e/1FAIpQLScUeGBnnjEt-FItRW8V_s8-dS17XK3S1tJkkx0NWnddDZA4bw/viewform"
										target="_blank"
										rel="noopener noreferrer"
									>
										PNG
									</a>{" "}
									er grafikkfiler som mister detaljer når de skaleres. Ved levering som PNG skal det leveres en fil for
									hver av de listede oppløsningene, altså 5 filer totalt. Disse må nødvendigvis ligne hverandre.
								</p>
							</div>
							<div className="col-12">
								<h3>Dimensjoner</h3>
								<p>
									En logo skal se bra ut på alt fra penner til bannere. Det er derfor viktig at logoen tar seg bra ut i
									forskjellige oppløsninger.
								</p>
								<p>
									Logoen bør passe bra innenfor et kvadrat, altså ha omtrent samme høyde/bredde. Litt avvik fra dette
									går bra. Hvor mye &quot;litt&quot; er vurderes ut fra skjønn.
								</p>
								<p>Følgende oppløsninger vil vurderes, oppgitt i piksler:</p>
								<ul>
									<li>128x128</li>
									<li>256x256</li>
									<li>512x512</li>
									<li>1024x1024</li>
									<li>2048x2048</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Kansellering av konkurransen</h2>
							<p>Styret forbeholder seg retten til å avlyse konkurransen til enhver tid.</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Frist</h2>
							<p>
								Frist for deltakelse i konkurransen er{" "}
								<time dateTime="2019-09-10T23:59:59+0200">onsdag 10. september 2019, kl. 23:59:59 norsk tid</time>
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Tips</h2>
							<ul>
								<li>En logo bør være enkel og ikke ha for mange detaljer.</li>
								<li>Prøv å få høyde og bredde så lik som mulig.</li>
								<li>
									Den skal se bra ut både på små gjenstander som penner og nøkkelringer og på store plakater. Fargene
									bør stå i kontrast til hverandre.
								</li>
								<li>Gradienter kan være lurt å unngå. </li>
								<li>For tynne streker vil forsvinne eller se uklare ut når logoen skaleres ned.</li>
								<li>
									Dersom du sender inn flere logoer, helst ikke send inn varianter av samme logo. Dette kan i såfall
									minske sannsynligheten for at en av de vil vinne.
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Levering</h2>
							<p>Logoen kan leveres som én .svg-fil eller som fem .png-filer</p>
							<p>Hver deltaker kan levere så mange logoer som ønskes.</p>
							<p>Styret forbeholder seg retten til å diskvalifisere enhver innlevert logo uten å oppgi grunn.</p>
							<p>
								Levering gjøres på{" "}
								<a
									href="https://docs.google.com/forms/d/e/1FAIpQLScUeGBnnjEt-FItRW8V_s8-dS17XK3S1tJkkx0NWnddDZA4bw/viewform"
									target="_blank"
									rel="noopener noreferrer"
								>
									dette skjemaet
								</a>
							</p>
							<p>
								<strong>Merk:</strong> Ved å levere en logo til konkurransen gir du Bergen Brettspillklubb alle
								rettigheter til den.
							</p>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
/*************
 * Export it *
 *************/

export { LogoContest };
