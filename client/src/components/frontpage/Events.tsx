import React from "react";
import { format } from "date-fns";
import { MeetupEvent, meetupEventSchema } from "../../models/MeetupEvent";
import { gql, useQuery } from "@apollo/client";
import * as yup from "yup";

type EventsProps = {
	events: MeetupEvent[] | null;
};

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
						<time dateTime={e.time.toISOString()}>{format(e.time, "dd MMM HH:mm")}</time>
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
	const { data } = useQuery<{ events: unknown }>(gql`
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
	`);

	const events =
		data?.events === undefined
			? null
			: yup.array(meetupEventSchema.required()).required().validateSync(data.events);

	return <Events events={events} />;
};

export default EventsContainer;
export { Events, EventsContainer };
