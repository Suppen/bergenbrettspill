import React, { useState } from "react";
import * as dateFns from "date-fns";
import { MeetupEvent } from "../../models/MeetupEvent";

const Events = () => {
	const [events, setEvents] = useState<MeetupEvent[] | null>(null);
	// TODO Fetch events

	return (
		<div className="events">
			<h2>Kommende hendelser</h2>
			<ul className="list-unstyled">
				{events?.map(e => (
					<li key={e.id} className="list-item card card-body">
						<a href={e.link} target="_blank" rel="noopener noreferrer">
							<h3 className="card-title">{e.name}</h3>
						</a>
						<p>
							<time dateTime={e.time.toISOString()}>{dateFns.format(e.time, "Do MMM HH:mm")}</time>
						</p>
						{e.rsvp !== null ? (
							<p>
								Påmeldte: {e.rsvp.yes}/{e.rsvp.limit}
								{e.rsvp.waitlistCount > 0 ? (
									<React.Fragment>
										<br />
										Venteliste: {e.rsvp.waitlistCount}
									</React.Fragment>
								) : null}
							</p>
						) : null}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Events;
export { Events };
