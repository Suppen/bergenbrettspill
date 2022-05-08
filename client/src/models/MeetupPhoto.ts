import * as yup from "yup";
import { env } from "../env";
import { createJSONFetcher } from "../fetchers/jsonFetcher";

/** A photo hosted on Meetup */
export type MeetupPhoto = string;

/** Schema for validating a meetup photo */
const meetupPhotoSchema = yup.string().url();
meetupPhotoSchema as yup.SchemaOf<MeetupPhoto>;

/**
 * Fetches photos from Meetup
 *
 * @returns Photos fetched from Meetup
 */
export const fetchMeetupPhotos = (): Promise<MeetupPhoto[]> =>
	createJSONFetcher<MeetupPhoto[]>(yup.array(meetupPhotoSchema.required()).required())(
		`${env.BACKEND_URL}/meetup/photos`
	);
