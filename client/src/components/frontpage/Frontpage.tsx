import DefaultLayout from "../layouts/default/DefaultLayout.js";
import Carousel from "./Carousel.jsx";
import Description from "./Description.jsx";
import Events from "./Events.jsx";

const Frontpage = (): JSX.Element => {
	return (
		<DefaultLayout>
			<div className="row">
				<div className="col-md-8 col-sm-12">
					<div className="row">
						<span className="col-12">
							<Carousel />
						</span>
					</div>
					<div className="row">
						<div className="col-12">
							<Description />
						</div>
					</div>
				</div>
				<div className="col-md-4 col-sm-12">
					<div className="col-12">
						<Events />
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export { Frontpage };
