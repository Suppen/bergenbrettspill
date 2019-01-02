/**************************
 * Import important stuff *
 **************************/

import React from "react";
import { Carousel } from "./Carousel.jsx";
import { Description } from "./Description.jsx";
import { Events } from "./Events.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";

/***************************
 * The Frontpage component *
 ***************************/

function Frontpage() {
	return (
		<React.Fragment>
			<div className="row">
				<div className="col-md-8 col-sm-12">
					<div className="row">
						<div className="col-12">
							<Carousel />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<Description />
						</div>
					</div>
				</div>
				<div className="col-md-4 col-sm-12">
					<div className="col-12">
						<Query
							query={gql`
								{
									events(limit: 6) {
										id
										name
										time
										link
									}
								}
							`}
						>
							{({ loading, error, data }) => {
								if (!loading && !error) {
									return <Events events={data.events} />;
								}
								return null;
							}}
						</Query>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

/*************
 * Export it *
 *************/

export { Frontpage };
