import * as yup from "yup";
import { env } from "../env";
import createJSONFetcher from "../fetchers/jsonFetcher";

/** One of Bergen Brettspillklubb's events, announced through Meetup */
export interface MeetupEvent {
	id: string;
	link: string;
	name: string;
	time: Date;
	rsvp: {
		limit: number;
		yes: number;
		waitlistCount: number;
	};
}

/** Schema for validating a Meetup event */
export const meetupEventSchema = yup.object({
	id: yup.string().required(),
	link: yup.string().required(),
	name: yup.string().required(),
	time: yup.date().required(),
	rsvp: yup
		.object({
			limit: yup.number().required(),
			yes: yup.number().required(),
			waitlistCount: yup.number().required()
		})
		.required()
});

meetupEventSchema as yup.SchemaOf<MeetupEvent>;

/**
 * Fetches all upcoming events
 *
 * @returns A list of all upcoming events
 */
export const fetchMeetupEvents = (): Promise<MeetupEvent[]> =>
	createJSONFetcher<MeetupEvent[]>(yup.array(meetupEventSchema.required()).required())(
		`${env.BACKEND_URL}/meetup/events`
	);
