/**************************
 * Import important stuff *
 **************************/

import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

/************************
 * The Events component *
 ************************/

function Events(props) {
	return (
		<div className="events">
			<h2>Kommende hendelser</h2>
			<ul className="list-unstyled">
				{props.events.map(e => (
					<li key={e.id} className="list-item card card-body">
						<a href={e.link} target="_blank" rel="noopener noreferrer">
							<h3 className="card-title">{e.name}</h3>
						</a>
						<time dateTime={moment(e.time).toISOString()}>{moment(e.time).format("Do MMM HH:mm")}</time>
					</li>
				))}
			</ul>
		</div>
	);
}

Events.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			time: PropTypes.string
		})
	).isRequired
};

Events.defaultProps = {
	events: []
};

/*************
 * Export it *
 *************/

export default Events;
export { Events };
