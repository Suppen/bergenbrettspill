import * as yup from "yup";
import { env } from "../env";
import createJSONFetcher from "../fetchers/jsonFetcher";

/** A Game object from BoardGameGeek */
export interface BGGGame {
	id: number;
	name: string;
	thumbnailUrl: string;
	minPlayers: number;
	maxPlayers: number;
	playingTime: number;
	mechanics: string[];
	bggUrl: string;
	expands?: Pick<BGGGame, "id" | "name" | "bggUrl">;
}

/** Partial schema of a BoardGameGeek game, to be able to partially recurse with it */
const bggGameSchemaBase = yup.object({
	id: yup.number().required(),
	name: yup.string().required(),
	thumbnailUrl: yup.string().required(),
	minPlayers: yup.number().required(),
	maxPlayers: yup.number().required(),
	playingTime: yup.number().required(),
	mechanics: yup.array(yup.string().required()).required(),
	bggUrl: yup.string().required()
});

/** Schema for validating a BoardGameGeek game object */
export const bggGameSchema = bggGameSchemaBase.shape({
	expands: bggGameSchemaBase.pick(["id", "name", "bggUrl"])
});

bggGameSchema as yup.SchemaOf<BGGGame>;

/**
 * Fetches all bames owned by Bergen Brettspillklubb from BoardGameGeek
 *
 * @returns List of all games owned by Bergen Brettspillklubb
 */
export const fetchBGGGames = (): Promise<BGGGame[]> =>
	createJSONFetcher<BGGGame[]>(yup.array(bggGameSchema.required()).required())(`${env.BACKEND_URL}/games/list`);
