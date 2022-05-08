import React, { useEffect, useState } from "react";
import * as dateFns from "date-fns";
import { fetchMeetupEvents, MeetupEvent } from "../../models/MeetupEvent";

interface EventsProps {
	events: MeetupEvent[] | null;
}

const Events = ({ events }: EventsProps) => (
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

const EventsContainer = (): JSX.Element => {
	const [events, setEvents] = useState<MeetupEvent[] | null>(null);
	useEffect(() => {
		let mounted = true;

		void (async () => {
			const events = await fetchMeetupEvents();
			if (!mounted) {
				return;
			}
			setEvents(events);
		});

		return () => {
			mounted = false;
		};
	}, []);

	return <Events events={events} />;
};

export default EventsContainer;
export { Events, EventsContainer };
