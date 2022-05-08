import * as yup from "yup";

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
	} | null;
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
		.nullable()
});

meetupEventSchema as yup.SchemaOf<MeetupEvent>;
