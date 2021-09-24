import React from "react";
import { Carousel } from "./Carousel.jsx";
import { Description } from "./Description.jsx";
import { Events } from "./Events.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";

/***************************
 * The Frontpage component *
 ***************************/

const Frontpage = () => (
	<React.Fragment>
		<div className="row">
			<div className="col-md-8 col-sm-12">
				<div className="row">
					<div className="col-12">
						<Query query={Frontpage._carouselQuery}>
							{({ loading, data }) => <Carousel imageSrcs={loading ? [] : data.photos} />}
						</Query>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<Query query={Frontpage._gameCountQuery}>
							{({ loading, data }) => <Description gamecount={loading ? 0 : data.boardgameCount} />}
						</Query>
					</div>
				</div>
			</div>
			<div className="col-md-4 col-sm-12">
				<div className="col-12">
					<Query query={Frontpage._eventQuery}>
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

/**
 * GraphQL query for the game count
 *
 * @type {Object}
 *
 * @private
 */
Frontpage._gameCountQuery = gql`
	query {
		boardgameCount
	}
`;

/**
 * GraphQL query for the events
 *
 * @type {Object}
 *
 * @private
 */
Frontpage._eventQuery = gql`
	{
		events(limit: 6) {
			id
			name
			time
			link
			rsvp {
				limit
				yes
				waitlistCount
			}
		}
	}
`;

/**
 * GraphQL query for the list of photos for the carousel
 *
 * @type {Object}
 *
 * @private
 */
Frontpage._carouselQuery = gql`
	{
		photos
	}
`;

/*************
 * Export it *
 *************/

export { Frontpage };
