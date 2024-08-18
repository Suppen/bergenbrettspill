import map from "../../assets/img/directions.png";
import vid from "../../assets/vid/directions.webm";
import DefaultLayout from "../layouts/default";

/**
 * URL to the map service
 */
const mapUrl =
	"https://www.google.no/maps/dir/Byparken+light+rail+stop,+Starvhusgaten+4,+5014+Bergen/60.3948752,5.3156753/@60.3938184,5.3173961,17.5z/data=!4m14!4m13!1m10!1m1!1s0x463cfea84eb9d69b:0x55ba049ec166cc2b!2m2!1d5.3255739!2d60.39202!3m4!1m2!1d5.3206!2d60.3933499!3s0x463cfc02c178d349:0x8ba664fc2cebea07!1m0!3e2?hl=e://www.google.no/maps/dir/''/60.3935837,5.3197432/Klosteret+2,+Bergen/@60.3939054,5.3185632,16.42z/data=!4m15!4m14!1m5!1m1!1s0x463cfea849109f0b:0xf382524b15aacfb6!2m2!1d5.3253352!2d60.3920871!1m0!1m5!1m1!1s0x463cfc034da492f1:0xad5a781d2e4b2019!2m2!1d5.3157108!2d60.3946303!3e2?hl=e://www.google.no/maps/dir/''/Klosteret+2,+Bergen/@60.3936422,5.3183343,17z/data=!4m19!4m18!1m10!1m1!1s0x463cfea849109f0b:0xf382524b15aacfb6!2m2!1d5.3253352!2d60.3920871!3m4!1m2!1d5.3158884!2d60.3948262!3s0x463cfc034b0f02a7:0xba72cce90a06001b!1m5!1m1!1s0x463cfc034da492f1:0xad5a781d2e4b2019!2m2!1d5.3157108!2d60.3946303!3e2?hl=en";

const Directions = () => (
	<DefaultLayout>
		<div>
			<h2 className="row">
				<span className="col-12">Hvor er vi?</span>
			</h2>
			<div className="row">
				<div className="col-12">
					<p>
						Vi holder til i 2. etasje i Nordnes Bydelshus, ca. 5 minutter gangavstand fra Torgallmenningen.
						Ta til venstre med en gang du kommer inn døren, gå opp trappen, og finn rommet som heter
						&quot;Kursrom&quot; på høyre side
					</p>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 col-lg-6 mb-3">
					<a target="_blank" href={mapUrl} rel="noopener noreferrer">
						<img className="w-100" src={map} alt="Veibeskrivelse" />
					</a>
				</div>
				<div className="col-md-12 col-lg-6 mb-3">
					<video className="w-100" preload="metadata" controls>
						<source src={`${vid}#t=0`} />
					</video>
				</div>
			</div>
		</div>
	</DefaultLayout>
);

export { Directions };
