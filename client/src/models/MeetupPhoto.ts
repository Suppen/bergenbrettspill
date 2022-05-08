import * as yup from "yup";

/** A photo hosted on Meetup */
export type MeetupPhoto = string;

/** Schema for validating a meetup photo */
export const meetupPhotoSchema = yup.string().url();
meetupPhotoSchema as yup.SchemaOf<MeetupPhoto>;
