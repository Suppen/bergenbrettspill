/**************************
 * Import important stuff *
 **************************/

import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import * as R from "ramda";

/************************
 * The Events component *
 ************************/

const Events = ({ events }) => (
	<div className="events">
		<h2>Kommende hendelser</h2>
		<ul className="list-unstyled">
			{events.map(e => (
				<li key={e.id} className="list-item card card-body">
					<a href={e.link} target="_blank" rel="noopener noreferrer">
						<h3 className="card-title">{e.name}</h3>
					</a>
					<p>
						<time dateTime={moment(e.time).toISOString()}>{moment(e.time).format("Do MMM HH:mm")}</time>
					</p>
					{R.unless(R.isNil, ({ limit, yes, waitlistCount }) => (
						<p>
							Påmeldte: {yes}/{limit}
							{waitlistCount > 0 ? (
								<React.Fragment>
									<br />
									Venteliste: {waitlistCount}
								</React.Fragment>
							) : null}
						</p>
					))(e.rsvp)}
				</li>
			))}
		</ul>
	</div>
);

Events.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			time: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired,
			rsvp: PropTypes.shape({
				limit: PropTypes.number.isRequired,
				yes: PropTypes.number.isRequired,
				waitlistCount: PropTypes.number.isRequired
			})
		})
	).isRequired
};

Events.defaultProps = {
	events: []
};

/*************
 * Export it *
 *************/

export { Events };
